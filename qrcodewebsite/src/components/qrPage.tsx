import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import '../App.css'

export default function QRPage() {
	const [value, setValue] = useState('https://')

	function downloadQRCode() {
		const canvas = document.getElementById('qr-canvas')
		if (!canvas) return
		// @ts-ignore - runtime DOM element
		const url = (canvas as HTMLCanvasElement).toDataURL('image/png')
		const a = document.createElement('a')
		a.href = url
		a.download = 'qrcode.png'
		document.body.appendChild(a)
		a.click()
		a.remove()
	}

	return (
			<section className="qr-container">
				<div className="qr-card">
					<div className="qr-header">
						<div>
							<h2>QR Creator</h2>
							<p className="qr-sub">Paste any URL and download a crisp QR code.</p>
						</div>
						<div className="brand">QR • Lite</div>
					</div>

					<div className="qr-body">
						<div className="qr-form">
							<label className="sr-only" htmlFor="qr-input">URL</label>
							<div className="input-row">
								<input
									id="qr-input"
									className="qr-input"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									placeholder="https://example.com"
									aria-label="URL"
								/>
								<button
									className="btn btn-ghost"
									onClick={() => setValue('https://')}
									title="Reset"
									aria-label="Reset URL"
								>
									Reset
								</button>
							</div>

							<div className="qr-actions">
								<button className="btn btn-primary" onClick={downloadQRCode} aria-label="Download QR code">
									Download PNG
								</button>
							</div>
						</div>

						<div className="qr-preview">
							<QRCodeCanvas id="qr-canvas" value={value || ''} size={300} includeMargin={true} />
						</div>
					</div>
				</div>
			</section>
	)
}
