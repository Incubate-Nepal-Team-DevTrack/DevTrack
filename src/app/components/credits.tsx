"use client";

import React from "react";

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                width: "100%",
                backgroundColor: "#f9f9f9",
                padding: "10px 0",
                textAlign: "center",
                borderTop: "1px solid #eaeaea",
                position: "fixed",
                bottom: 0,
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    maxWidth: "1000px",
                    margin: "0 auto",
                    padding: "auto",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p
                        style={{
                            margin: 0,
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        DevTrack &nbsp;
                    </p>
                    <p style={{ margin: 0, color: "#777" }}> © {new Date().getFullYear()} All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
