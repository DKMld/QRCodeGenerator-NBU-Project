import React, { useMemo, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import logo from '../assets/react.svg'
import '../App.css'

export default function QRPage() {
	const [value, setValue] = useState('https://')
	const [email, setEmail] = useState('')
	const [embedLogo, setEmbedLogo] = useState(true)
	const [showEmailError, setShowEmailError] = useState(false)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	const isValidEmail = useMemo(() => {
		const trimmed = email.trim()
		if (!trimmed) return false
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
	}, [email])

	const isValidUrl = useMemo(() => value.trim().length > 0, [value])

	const canDownload = isValidEmail && isValidUrl

	function downloadQRCode() {
		if (!isValidEmail) {
			setShowEmailError(true)
			return
		}
		if (!canvasRef.current) return
		const url = canvasRef.current.toDataURL('image/png')
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
							<p className="qr-sub">Paste any URL, add your email, and download a crisp QR code.</p>
							<div className="qr-highlights">
								<span>High-resolution</span>
								<span>Logo embedding</span>
								<span>Instant download</span>
							</div>
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

							<div className="email-row">
								<label className="label" htmlFor="email-input">Email address</label>
								<input
									id="email-input"
									type="email"
									className={`qr-input ${showEmailError && !isValidEmail ? 'qr-input-error' : ''}`}
									value={email}
									onChange={(e) => {
										setEmail(e.target.value)
										setShowEmailError(false)
									}}
									placeholder="you@company.com"
									aria-label="Email address"
								/>
								{showEmailError && !isValidEmail ? (
									<p className="field-error">Please enter a valid email to unlock the download.</p>
								) : (
									<p className="field-hint">We only use this to send your QR download link.</p>
								)}
							</div>

							<div className="toggle-row">
								<label className="toggle">
									<input
										type="checkbox"
										checked={embedLogo}
										onChange={(e) => setEmbedLogo(e.target.checked)}
									/>
									<span className="toggle-ui" />
									<span>Embed brand logo in the center</span>
								</label>
							</div>

							<div className="qr-actions">
								<button
									className="btn btn-primary"
									onClick={downloadQRCode}
									aria-label="Download QR code"
									disabled={!canDownload}
								>
									Download PNG
								</button>
							</div>
						</div>

						<div className="qr-preview">
							<QRCodeCanvas
								id="qr-canvas"
								ref={canvasRef}
								value={value || ''}
								size={300}
								includeMargin={true}
								imageSettings={
									embedLogo
										? {
												src: logo,
												height: 60,
												width: 60,
												excavate: true,
										  }
										: undefined
								}
							/>
						</div>
					</div>
				</div>
			</section>
	)
}
