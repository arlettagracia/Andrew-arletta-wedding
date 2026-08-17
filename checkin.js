const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyIpXj_OoNuFAGCh19Lpcl6ixCuKdINopRTTyCLfbpl9ev8BIgsG4IAK7eRW4TXT2aR/exec";


const result =
    document.getElementById("result");

const resultMessage =
    document.getElementById("resultMessage");


function onScanSuccess(decodedText) {

    console.log(
        "QR TERBACA:",
        decodedText
    );


    html5QrcodeScanner.clear();


    result.className =
        "result active";


    resultMessage.innerHTML =
        "<p>QR TERBACA</p>" +
        "<p><strong>" +
        decodedText +
        "</strong></p>" +
        "<p>Mengirim data...</p>";


    fetch(
        GOOGLE_SCRIPT_URL,
        {

            method: "POST",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body: JSON.stringify({

                action: "checkin",

                guestId:
                    decodedText.trim()

            })

        }
    )

    .then(function(response) {

        return response.text();

    })

    .then(function(responseText) {

        console.log(
            "HASIL APPS SCRIPT:",
            responseText
        );


        try {

            const data =
                JSON.parse(responseText);


            console.log(
                "DATA CHECK-IN:",
                data
            );


            if (data.success === true) {

                const nama =
                    data.nama ||
                    "Nama tidak tersedia";

                const jumlah =
                    data.jumlahTamu ||
                    "0";


                resultMessage.innerHTML =

                    "<p style='font-size:32px;'>✓</p>" +

                    "<h2>CHECK-IN BERHASIL</h2>" +

                    "<p class='guest-name'>" +
                    nama +
                    "</p>" +

                    "<p>" +
                    jumlah +
                    " orang</p>" +

                    "<p style='font-size:13px;'>" +
                    "ID: " +
                    data.id +
                    "</p>";

                    document.getElementById(
    "scanAgainButton"
).style.display = "inline-block";


            } else {

                resultMessage.innerHTML =

                    "<p style='font-size:24px;'>⚠️</p>" +

                    "<h2>" +
                    data.message +
                    "</h2>";

            }


        } catch (error) {

            console.log(
                "Response bukan JSON:",
                responseText
            );


            resultMessage.innerHTML =

                "<p>Request sudah dikirim.</p>" +

                "<p>Guest ID:</p>" +

                "<p><strong>" +
                decodedText +
                "</strong></p>" +

                "<p>Silakan cek Google Sheets.</p>";

        }

    })

    .catch(function(error) {

        console.error(
            "CHECK-IN ERROR:",
            error
        );


        result.className =
            "result active error";


        resultMessage.innerHTML =

            "<p>❌ Gagal mengirim check-in.</p>";

    });

}


function onScanFailure(error) {

    // kosong
}


const html5QrcodeScanner =
    new Html5QrcodeScanner(

        "reader",

        {

            fps: 10,

            qrbox: {
                width: 250,
                height: 250
            },

            rememberLastUsedCamera:
                true

        },

        false

    );


html5QrcodeScanner.render(
    onScanSuccess,
    onScanFailure
);

// ========================================
// SCAN TAMU BERIKUTNYA
// ========================================

function scanAgain() {

    location.reload();

}