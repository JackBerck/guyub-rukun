<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Laporan Pengguna</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #f6f8fa;
            margin: 0;
            padding: 0;
        }

        .container {
            background: #fff;
            max-width: 500px;
            margin: 40px auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
            padding: 32px 28px;
        }

        h2 {
            color: #2d3748;
            margin-top: 0;
            margin-bottom: 24px;
            font-size: 1.5em;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
        }

        .info-group {
            margin-bottom: 18px;
        }

        .label {
            color: #718096;
            font-weight: 600;
            display: block;
            margin-bottom: 2px;
        }

        .value {
            color: #2d3748;
            margin-bottom: 4px;
        }

        .reason-box {
            background: #f1f5f9;
            border-left: 4px solid #3182ce;
            padding: 12px 16px;
            border-radius: 4px;
            color: #2d3748;
            margin-bottom: 20px;
        }

        .footer {
            font-size: 0.95em;
            color: #a0aec0;
            margin-top: 32px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Laporan Pengguna</h2>
        <div class="info-group">
            <span class="label">Nama Pengguna yang Dilaporkan:</span>
            <span class="value">{{ $reportedUser->name }} (ID: {{ $reportedUser->id }})</span>
        </div>
        <div class="info-group">
            <span class="label">Email Pengguna:</span>
            <span class="value">{{ $reportedUser->email }}</span>
        </div>
        <div class="info-group">
            <span class="label">Pelapor:</span>
            <span class="value">
                @if ($reporter)
                    {{ $reporter->name }} (ID: {{ $reporter->id }}, Email: {{ $reporter->email }})
                @else
                    Tidak diketahui
                @endif
            </span>
        </div>
        <div class="info-group">
            <span class="label">Alasan Laporan:</span>
            <div class="reason-box">
                {{ $data['reason'] }}
            </div>
        </div>
        <div class="footer">
            Email ini dikirim otomatis oleh sistem PeduliRasa.
        </div>
    </div>
</body>

</html>
