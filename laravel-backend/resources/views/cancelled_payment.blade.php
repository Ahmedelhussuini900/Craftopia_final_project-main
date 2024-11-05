<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Payment Canceled</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
<style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f4f7fc;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.cancel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.cancel-message {
    text-align: center;
    background-color: #fff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
}

h1 {
    color: #dc3545; /* Red for canceled */
    font-size: 32px;
    margin-bottom: 20px;
}

p {
    color: #333;
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1.6;
}

.back-button {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 24px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #0056b3;
}

</style>
</head>
<body>
    <div class="cancel-container">
        <div class="cancel-message">
            <h1>Payment Canceled</h1>
            <p>You have canceled your payment. If you wish to try again, please revisit the payment page.</p>
            <p>We hope to see you back soon at Craftopia!</p>
            <a href="{{ env('FRONT_DOMAIN_URL')}}" class="back-button">Go back to Craftopia Website</a>
        </div>
    </div>
</body>
</html>
