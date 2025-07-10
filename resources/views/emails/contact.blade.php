<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Pesan Kontak Baru</title>
    <style>
        body {
            background: #f4f6f8;
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .email-container {
            background: #fff;
            max-width: 500px;
            margin: 40px auto;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            padding: 32px 28px;
        }

        .header {
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 24px;
            padding-bottom: 12px;
        }

        .header h2 {
            color: #2d3748;
            margin: 0;
            font-size: 1.5rem;
        }

        .info {
            margin-bottom: 18px;
        }

        .info strong {
            color: #4a5568;
            min-width: 60px;
            display: inline-block;
        }

        .message-label {
            color: #4a5568;
            font-weight: bold;
            margin-bottom: 6px;
            display: block;
        }

        .message-content {
            background: #f7fafc;
            border-radius: 6px;
            padding: 16px;
            color: #2d3748;
            font-size: 1rem;
            line-height: 1.6;
            white-space: pre-line;
        }

        @media (max-width: 600px) {
            .email-container {
                padding: 16px 8px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h2>Pesan Kontak Baru dari {{ $data['name'] }}</h2>
        </div>
        <div class="info">
            <strong>Email:</strong> {{ $data['email'] }}
        </div>
        <div>
            <span class="message-label">Pesan:</span>
            <div class="message-content">
                {{ $data['message'] }}
            </div>
        </div>
    </div>
</body>

</html>
