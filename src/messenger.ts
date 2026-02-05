var id = 'message-button-for-gdt'

export function showMessenger() {
    return `
    <li class="flex-item">
        <button class="widgetlink" id=${id}>
            Message
        </button>
        <p>Send us a message, feedback, or offer support.</p>
    </li>
    `
}

// Modal contact form logic
document.addEventListener('DOMContentLoaded', () => {
    let messageBtn = document.getElementById(id);
    if (messageBtn) {
        messageBtn.addEventListener('click', () => {
            let modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '1000';

            let modalContent = document.createElement('div');
            modalContent.style.background = 'white';
            modalContent.style.padding = '1em';
            modalContent.style.margin = '1em';
            modalContent.style.borderRadius = '10px';
            modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            modalContent.style.textAlign = 'center';
            modalContent.style.position = 'relative';

            let title = document.createElement('h2');
            title.textContent = 'Contact Grampound Digital Twin';
            title.style.textAlign = 'center';
            modalContent.appendChild(title);

            let description = document.createElement('p');
            description.textContent = 'Please do not share confidential information.';
            description.style.textAlign = 'center';
            modalContent.appendChild(description);

            let form = document.createElement('form');
            form.style.display = 'flex';
            form.style.flexDirection = 'column';
            form.style.alignItems = 'center';
            form.style.gap = '1em';

            // Name input
            let nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.name = 'fn';
            nameInput.placeholder = 'Your name';
            nameInput.required = false;
            nameInput.style.width = '100%';
            form.appendChild(nameInput);

            // Email input
            let emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.name = 'fe';
            emailInput.placeholder = 'Your email (optional)';
            emailInput.required = false;
            emailInput.style.width = '100%';
            form.appendChild(emailInput);

            // Message textarea
            let messageInput = document.createElement('textarea');
            messageInput.name = 'fm';
            messageInput.placeholder = 'Your message';
            messageInput.required = true;
            messageInput.rows = 4;
            messageInput.style.width = '100%';
            form.appendChild(messageInput);

            // Simple arithmetic test for spam prevention
            const NUM_1 = Math.floor(Math.random() * 10) + 1;
            const NUM_2 = Math.floor(Math.random() * 10) + 1;
            let testLabel = document.createElement('label');
            testLabel.textContent = `Checking you are human. What is ${NUM_1} + ${NUM_2}? `;
            testLabel.style.marginTop = '1em';
            testLabel.htmlFor = 'arithmetic-test';
            form.appendChild(testLabel);

            let testInput = document.createElement('input');
            testInput.type = 'number';
            testInput.id = 'arithmetic-test';
            testInput.required = true;
            testInput.style.width = '4em';
            form.appendChild(testInput);

            // Submit button
            let submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.textContent = 'Send';
            submitBtn.style.marginTop = '1em';
            submitBtn.disabled = true;
            form.appendChild(submitBtn);

            // Enable submit only if arithmetic test is correct
            testInput.addEventListener('input', () => {
                if (Number(testInput.value) === NUM_1 + NUM_2) {
                    submitBtn.disabled = false;
                    submitBtn.classList.add('widgetlink')

                }
                else {
                    submitBtn.disabled = true;
                    submitBtn.classList.remove('widgetlink')
                }
            });

            // Status message
            let statusMsg = document.createElement('div');
            statusMsg.style.marginTop = '1em';
            statusMsg.style.color = 'green';
            form.appendChild(statusMsg);

            form.onsubmit = async (e) => {
                e.preventDefault();
                submitBtn.disabled = true;
                statusMsg.textContent = 'Sending...';
                try {
                    const RES = await fetch('https://photos.grampound.org.uk/repack.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `fn=${encodeURIComponent(nameInput.value)}&fe=${encodeURIComponent(emailInput.value)}&fm=${encodeURIComponent(messageInput.value)}`
                    });
                    const text = await RES.text();
                    statusMsg.textContent = 'Message sent! Thank you.';
                    console.log('Message sent:', text);
                    submitBtn.disabled = false;
                    form.reset();
                } catch (err) {
                    statusMsg.textContent = 'Error sending message. Please try again.';
                    submitBtn.disabled = false;
                }
            };

            modalContent.appendChild(form);

            // Close button
            let closeBtn = document.createElement('button');
            closeBtn.textContent = '✕';
            closeBtn.setAttribute('aria-label', 'Close');
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '0.2em';
            closeBtn.style.right = '0.2em';
            closeBtn.style.background = 'transparent';
            closeBtn.style.border = 'none';
            closeBtn.style.fontSize = '1.5em';
            closeBtn.style.cursor = 'pointer';
            closeBtn.onclick = () => {
                document.body.removeChild(modal);
            };
            modalContent.appendChild(closeBtn);

            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            modalContent.scrollIntoView();
        });
    }
});