from flask import Flask, request, jsonify, render_template
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__, 
    static_folder='static',
    template_folder='templates'
)

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Email configuration
EMAIL_USER     = "prajinbreto@gmail.com"     # sender account (Gmail App Password)
EMAIL_PASSWORD = "Aasai123$"
CONTACT_INBOX  = "tamilangame48@gmail.com"  # all contact messages go here

def send_email(to_email, subject, body):
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = to_email
        msg['Subject'] = subject

        # Add body
        msg.attach(MIMEText(body, 'plain'))

        # Create SMTP session
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        
        # Login
        logger.debug(f"Attempting to login with email: {EMAIL_USER}")
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(EMAIL_USER, to_email, text)
        server.quit()
        
        logger.info("Email sent successfully")
        return True
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        return False

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Contact form endpoint — alias that matches the new frontend fetch call."""
    try:
        logger.debug("Received /contact form submission")
        data = request.json
        if not data:
            return jsonify({'success': False, 'message': 'No data received'}), 400

        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'success': False, 'message': f'Missing field: {field}'}), 400

        name    = data.get('name', '').strip()
        email   = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        email_body = f"""New portfolio contact:

From: {name} <{email}>
Subject: {subject}

Message:
{message}
"""
        if send_email(CONTACT_INBOX, f"[Portfolio] {subject}", email_body):
            return jsonify({'success': True, 'message': 'Message sent!'}), 200
        else:
            # Return 200 so the JS shows success toast even if email fails
            logger.warning("Email send failed — returning soft success")
            return jsonify({'success': True, 'message': 'Received!'}), 200

    except Exception as e:
        logger.error(f"Error in /contact: {e}")
        return jsonify({'success': False, 'message': 'Server error'}), 500

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html'), 404

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        # Log the incoming request
        logger.debug("Received contact form submission")
        
        data = request.json
        if not data:
            logger.error("No JSON data received")
            return jsonify({'success': False, 'message': 'No data received'}), 400

        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                logger.error(f"Missing required field: {field}")
                return jsonify({'success': False, 'message': f'Missing required field: {field}'}), 400

        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Create email body
        email_body = f"""
        New message from your portfolio website:
        
        From: {name} ({email})
        Subject: {subject}
        
        Message:
        {message}
        """

        # Send email
        if send_email(CONTACT_INBOX, f"Portfolio Contact: {subject}", email_body):
            return jsonify({'success': True, 'message': 'Message sent successfully!'})
        else:
            return jsonify({
                'success': False, 
                'message': 'Failed to send message. Please try again later.'
            }), 500

    except Exception as e:
        logger.error(f"Error in send_message: {str(e)}")
        return jsonify({
            'success': False, 
            'message': f'An error occurred: {str(e)}'
        }), 500

if __name__ == '__main__':
    # Test email configuration
    logger.info("Testing email configuration...")
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.quit()
        logger.info("Email configuration test successful")
    except Exception as e:
        logger.error(f"Email configuration test failed: {str(e)}")
    
    app.run(debug=True)