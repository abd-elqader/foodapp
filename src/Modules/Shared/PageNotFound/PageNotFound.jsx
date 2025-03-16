import React from "react";
import "./PageNotFound.css"; // Import custom CSS if needed

export default function PageNotFound() {
    return (
        <div className="not-found-container">
            {/* Header Section */}
            <header className="not-found-header">
                <h1>404</h1>
                <p>Page Not Found</p>
            </header>

            {/* Body Section */}
            <main className="not-found-body">
                <p>Oops! The page you're looking for doesn't exist.</p>
                <button className="not-found-button">Go Back Home</button>
            </main>

            {/* Footer Section */}
            <footer className="not-found-footer">
                <p>Need help? <a href="/contact">Contact Support</a></p>
            </footer>
        </div>
    );
}