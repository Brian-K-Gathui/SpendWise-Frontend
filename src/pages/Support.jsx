export default function SupportPage() {
    return (
        <div className="bg-background text-primary-foreground min-h-screen">
            <header className="bg-primary py-4 px-6">
                <h1 className="text-2xl font-bold">Support Center</h1>
            </header>
            <main className="container mx-auto py-8 px-4">
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                    <div className="bg-card p-4 rounded-lg">
                        <details className="mb-4">
                            <summary className="font-semibold">How do I reset my password?</summary>
                            <p className="mt-2">To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions to reset your password.</p>
                        </details>
                        <details className="mb-4">
                            <summary className="font-semibold">Is my undefined secure?</summary>
                            <p className="mt-2">Yes, we take undefined security very seriously. All your information is encrypted and stored securely.</p>
                        </details>
                        <details className="mb-4">
                            <summary className="font-semibold">How can I contact support?</summary>
                            <p className="mt-2">You can contact our support team via email at support@example.com or through the live chat feature on our website.</p>
                        </details>
                    </div>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                    <div className="bg-card p-4 rounded-lg">
                        <p className="mb-4">If you have any other questions or need further assistance, feel free to reach out to us using the form below:</p>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block font-semibold">Name</label>
                                <input type="text" id="name" className="w-full bg-input text-primary-foreground rounded-lg p-2" placeholder="Your Name" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-semibold">Email</label>
                                <input type="email" id="email" className="w-full bg-input text-primary-foreground rounded-lg p-2" placeholder="Your Email" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block font-semibold">Message</label>
                                <textarea id="message" className="w-full bg-input text-primary-foreground rounded-lg p-2" rows="4" placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" className="bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/80">Submit</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}