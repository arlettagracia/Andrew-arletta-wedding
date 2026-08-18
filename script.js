// ========================================
// NAMA TAMU OTOMATIS DARI URL
// ========================================
const urlParams =
    new URLSearchParams(
        window.location.search
    );

const guestName =
    urlParams.get("to");

const guestIdFromUrl =
    urlParams.get("id");

const guestElement =
    document.getElementById("guestName");

if (guestName && guestElement) {
    guestElement.textContent = guestName;
}

// ========================================
// GOOGLE SHEETS
// ========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyIpXj_OoNuFAGCh19Lpcl6ixCuKdINopRTTyCLfbpl9ev8BIgsG4IAK7eRW4TXT2aR/exec";


// ========================================
// OPEN INVITATION + MUSIC
// ========================================

function openInvitation() {

    console.log("BUKA UNDANGAN DIKLIK");

    // -------------------------------
    // MUSIK
    // -------------------------------

    const music =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");


    if (music) {

        music.volume = 0.5;

        music.play()
            .then(function () {

                console.log("MUSIK ON 🎵");

                if (musicButton) {

                    musicButton.textContent = "🎵";

                    musicButton.classList.remove("muted");

                }

            })
            .catch(function (error) {

                console.error(
                    "Musik gagal diputar:",
                    error
                );

            });

    }


    // -------------------------------
    // COVER
    // -------------------------------

    const cover =
        document.querySelector(".cover");

    if (cover) {

        cover.classList.add(
            "invitation-open"
        );

    }


    // -------------------------------
    // SCROLL
    // -------------------------------

    const coupleSection =
        document.getElementById("couple");

    if (coupleSection) {

        setTimeout(function () {

            coupleSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 500);

    }

}


// ========================================
// MUSIC MUTE / UNMUTE
// ========================================

function toggleMusic() {

    const music =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");


    if (!music) {

        console.error(
            "backgroundMusic tidak ditemukan."
        );

        return;

    }


    if (music.paused) {

        music.play()
            .then(function () {

                if (musicButton) {

                    musicButton.textContent = "🎵";

                    musicButton.classList.remove(
                        "muted"
                    );

                }

            })
            .catch(function (error) {

                console.error(
                    "Gagal memutar musik:",
                    error
                );

            });

    } else {

        music.pause();

        if (musicButton) {

            musicButton.textContent = "🔇";

            musicButton.classList.add(
                "muted"
            );

        }

    }

}


// ========================================
// COUNTDOWN
// ========================================

const weddingDate =
    new Date(
        "November 07, 2026 15:00:00"
    ).getTime();


const countdownTimer =
    setInterval(function () {

        const now =
            new Date().getTime();

        const distance =
            weddingDate - now;


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (distance <= 0) {

            clearInterval(countdownTimer);

            if (daysElement)
                daysElement.textContent = "00";

            if (hoursElement)
                hoursElement.textContent = "00";

            if (minutesElement)
                minutesElement.textContent = "00";

            if (secondsElement)
                secondsElement.textContent = "00";

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        if (daysElement)
            daysElement.textContent =
                String(days).padStart(2, "0");


        if (hoursElement)
            hoursElement.textContent =
                String(hours).padStart(2, "0");


        if (minutesElement)
            minutesElement.textContent =
                String(minutes).padStart(2, "0");


        if (secondsElement)
            secondsElement.textContent =
                String(seconds).padStart(2, "0");


    }, 1000);


// ========================================
// GALLERY
// ========================================

function openGallery(image) {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    const galleryImage =
        document.getElementById(
            "galleryImage"
        );


    if (!lightbox || !galleryImage) {
        return;
    }


    galleryImage.src =
        image.src;


    lightbox.classList.add(
        "active"
    );

}


function closeGallery() {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );


    if (lightbox) {

        lightbox.classList.remove(
            "active"
        );

    }

}


// ========================================
// RSVP
// ========================================

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const rsvpSuccess =
    document.getElementById(
        "rsvpSuccess"
    );

const successName =
    document.getElementById(
        "successName"
    );

const guestCountGroup =
    document.getElementById(
        "guestCountGroup"
    );


// ========================================
// PILIHAN KEHADIRAN
// ========================================

const attendanceInputs =
    document.querySelectorAll(
        'input[name="attendance"]'
    );


attendanceInputs.forEach(
    function (input) {

        input.addEventListener(
            "change",
            function () {

                if (!guestCountGroup) {
                    return;
                }


                if (this.value === "Hadir") {

                    guestCountGroup.style.display =
                        "block";

                } else {

                    guestCountGroup.style.display =
                        "none";

                }

            }
        );

    }
);


// ========================================
// RSVP SUBMIT
// ========================================

if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            // ========================================
// PROTEKSI DOUBLE SUBMIT RSVP
// ========================================

if (rsvpForm.dataset.submitting === "true") {

    console.warn(
        "RSVP sedang diproses. Pengiriman kedua dibatalkan."
    );

    return;

}

rsvpForm.dataset.submitting = "true";

            const nameElement =
                document.getElementById(
                    "guestNameRsvp"
                );

            const phoneElement =
                document.getElementById(
                    "guestPhone"
                );

            const guestCountElement =
                document.getElementById(
                    "guestCount"
                );


            const name =
                nameElement
                    ? nameElement.value.trim()
                    : "";


            const phone =
                phoneElement
                    ? phoneElement.value.trim()
                    : "";


            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            const guestCount =
                guestCountElement
                    ? guestCountElement.value
                    : "1";


            if (
                !name ||
                !phone ||
                !attendance
            ) {

                alert(
                    "Mohon lengkapi data terlebih dahulu."
                );

                rsvpForm.dataset.submitting = "false";

if (submitButton) {

    submitButton.disabled = false;

    submitButton.textContent =
        submitButton.dataset.originalText ||
        "KIRIM RSVP";

}

                return;

            }

// -------------------------------
// GUEST ID DARI LINK UNDANGAN
// -------------------------------

const guestId = guestIdFromUrl;

if (!guestId) {

    alert(
        "Guest ID tidak ditemukan. Silakan buka undangan melalui link undangan pribadi."
    );

    rsvpForm.dataset.submitting = "false";

    return;

}

            const guestIdElement =
                document.getElementById(
                    "guestId"
                );


            if (guestIdElement) {

                guestIdElement.textContent =
                    guestId;

            }


            // -------------------------------
            // SUCCESS NAME
            // -------------------------------

            if (successName) {

                successName.textContent =
                    "Terima kasih, " +
                    name +
                    " ♡";

            }


            // -------------------------------
            // QR CODE
            // -------------------------------

            const qrContainer =
                document.getElementById(
                    "qrcode"
                );


            if (
                qrContainer &&
                typeof QRCode !== "undefined"
            ) {

                qrContainer.innerHTML = "";


                new QRCode(
                    qrContainer,
                    {
                        text: guestId,

                        width: 180,

                        height: 180,

                        correctLevel:
                            QRCode.CorrectLevel.H
                    }
                );

            }


            // -------------------------------
            // GOOGLE SHEETS
            // -------------------------------

            fetch(
                GOOGLE_SCRIPT_URL,
                {

                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        id: guestId,

                        nama: name,

                        whatsapp: phone,

                        kehadiran:
                            attendance.value,

                        jumlahTamu:
                            guestCount

                    })

                }
            )
            .then(function () {

                console.log(
                    "RSVP berhasil dikirim."
                );

            })
            .catch(function (error) {

                console.error(
                    "Gagal mengirim RSVP:",
                    error
                );

            });


            // -------------------------------
            // TAMPILKAN SUCCESS
            // -------------------------------

            rsvpForm.style.display =
                "none";


            if (rsvpSuccess) {

                rsvpSuccess.classList.add(
                    "active"
                );

            }


        }
    );

}

// ========================================
// TAMBAHAN VALIDASI RSVP
// ========================================

function validateRSVPData() {

    const nameElement =
        document.getElementById(
            "guestNameRsvp"
        );

    const phoneElement =
        document.getElementById(
            "guestPhone"
        );

    const attendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        );

    const guestCountElement =
        document.getElementById(
            "guestCount"
        );

        // ========================================
// KUNCI TOMBOL RSVP
// ========================================

const submitButton =
    rsvpForm.querySelector(
        'button[type="submit"]'
    );

if (submitButton) {

    submitButton.disabled = true;

    submitButton.dataset.originalText =
        submitButton.textContent;

    submitButton.textContent =
        "MENGIRIM...";

}


    // ========================================
    // CEK NAMA
    // ========================================

    if (!nameElement) {

        console.error(
            "Input nama RSVP tidak ditemukan."
        );

        return false;

    }


    const name =
        nameElement.value.trim();


    if (!name) {

        alert(
            "Mohon isi nama terlebih dahulu."
        );

        nameElement.focus();

        return false;

    }


    // ========================================
    // CEK NOMOR WHATSAPP
    // ========================================

    if (!phoneElement) {

        console.error(
            "Input WhatsApp tidak ditemukan."
        );

        return false;

    }


    const phone =
        phoneElement.value.trim();


    if (!phone) {

        alert(
            "Mohon isi nomor WhatsApp terlebih dahulu."
        );

        phoneElement.focus();

        return false;

    }


    // ========================================
    // BERSIHKAN NOMOR
    // ========================================

    const cleanPhone =
        phone.replace(
            /[\s\-()+]/g,
            ""
        );


    // ========================================
    // VALIDASI ANGKA
    // ========================================

    if (
        !/^\d+$/.test(
            cleanPhone
        )
    ) {

        alert(
            "Nomor WhatsApp hanya boleh berisi angka."
        );

        phoneElement.focus();

        return false;

    }


    // ========================================
    // VALIDASI PANJANG NOMOR
    // ========================================

    if (
        cleanPhone.length < 10 ||
        cleanPhone.length > 15
    ) {

        alert(
            "Mohon masukkan nomor WhatsApp yang valid."
        );

        phoneElement.focus();

        return false;

    }


    // ========================================
    // CEK KEHADIRAN
    // ========================================

    if (!attendance) {

        alert(
            "Mohon pilih konfirmasi kehadiran."
        );

        return false;

    }


    // ========================================
    // JIKA HADIR
    // ========================================

    if (
        attendance.value ===
        "Hadir"
    ) {

        if (!guestCountElement) {

            console.error(
                "Input jumlah tamu tidak ditemukan."
            );

            return false;

        }


        const guestCount =
            parseInt(
                guestCountElement.value,
                10
            );


        if (
            isNaN(guestCount) ||
            guestCount < 1
        ) {

            alert(
                "Jumlah tamu minimal 1 orang."
            );

            guestCountElement.focus();

            return false;

        }


        if (guestCount > 10) {

            alert(
                "Jumlah tamu maksimal 10 orang."
            );

            guestCountElement.focus();

            return false;

        }

    }


    return true;

}

// ========================================
// WEDDING WISHES
// ========================================

function sendWish() {

    console.log("TOMBOL KIRIM UCAPAN DIKLIK");


    const nameInput =
        document.getElementById("wishName");

    const messageInput =
        document.getElementById("wishMessage");

    const button =
        document.getElementById("wishButton");


    // ========================================
    // CEK INPUT
    // ========================================

    if (!nameInput || !messageInput) {

        console.error(
            "Input Wedding Wish tidak ditemukan."
        );

        alert(
            "Form ucapan belum terhubung dengan benar."
        );

        return;

    }


    // ========================================
    // AMBIL DATA
    // ========================================

    const name =
        nameInput.value.trim();

    const message =
        messageInput.value.trim();


    // ========================================
    // VALIDASI
    // ========================================

    if (!name || !message) {

        alert(
            "Mohon isi nama dan ucapan terlebih dahulu."
        );

        return;

    }


    // ========================================
    // BUTTON LOADING
    // ========================================

    if (button) {

        button.disabled = true;

        button.textContent =
            "MENGIRIM...";

    }


    console.log(
        "Mengirim Wedding Wish:",
        name,
        message
    );


    // ========================================
    // KIRIM KE GOOGLE APPS SCRIPT
    // ========================================

    fetch(
        GOOGLE_SCRIPT_URL,
        {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "text/plain;charset=utf-8"

            },

            body: JSON.stringify({

                action: "wish",

                nama: name,

                ucapan: message

            })

        }
    )

    .then(function () {

        console.log(
            "Wedding Wish berhasil dikirim."
        );


        // ========================================
        // TAMPILKAN LANGSUNG DI WEBSITE
        // ========================================

        addWishToPage(
            name,
            message
        );


        // ========================================
        // KOSONGKAN FORM
        // ========================================

        nameInput.value = "";

        messageInput.value = "";


        // ========================================
        // PESAN SUKSES
        // ========================================

        alert(
            "Terima kasih atas ucapan dan doanya 🤍"
        );

    })

    .catch(function (error) {

        console.error(
            "Wedding Wish gagal dikirim:",
            error
        );


        alert(
            "Maaf, ucapan gagal dikirim."
        );

    })

    .finally(function () {

        if (button) {

            button.disabled = false;

            button.textContent =
                "KIRIM UCAPAN";

        }

    });

}


// ========================================
// TAMPILKAN UCAPAN DI WEBSITE
// ========================================

function addWishToPage(
    name,
    message
) {

    const wishesList =
        document.getElementById(
            "wishesList"
        );


    if (!wishesList) {

        console.warn(
            "wishesList tidak ditemukan."
        );

        return;

    }


    const wishCard =
        document.createElement(
            "div"
        );


    wishCard.className =
        "wish-card";


    wishCard.innerHTML = `

        <div class="wish-heart">
            ♡
        </div>

        <h3>
            ${escapeHtml(name)}
        </h3>

        <p>
            ${escapeHtml(message)}
        </p>

    `;


    wishesList.prepend(
        wishCard
    );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// ========================================
// LOAD WEDDING WISHES DARI GOOGLE SHEETS
// ========================================

function loadWishes() {

    const wishesList =
        document.getElementById(
            "wishesList"
        );


    if (!wishesList) {

        console.warn(
            "wishesList tidak ditemukan."
        );

        return;

    }


    console.log(
        "Mengambil Wedding Wishes..."
    );


    fetch(
        GOOGLE_SCRIPT_URL +
        "?action=getWishes"
    )

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        console.log(
            "Data Wedding Wishes:",
            data
        );


        if (
            !data ||
            !data.success ||
            !data.wishes
        ) {

            console.warn(
                "Tidak ada Wedding Wishes."
            );

            return;

        }


        // Bersihkan daftar lama

        wishesList.innerHTML = "";


        // Tampilkan dari terbaru

        data.wishes
            .slice()
            .reverse()
            .forEach(
                function(wish) {

                    addWishToPage(
                        wish.nama,
                        wish.ucapan
                    );

                }
            );

    })

    .catch(function(error) {

        console.error(
            "Gagal mengambil Wedding Wishes:",
            error
        );

    });

}


// ========================================
// LOAD SAAT WEBSITE DIBUKA
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Website siap."
        );


        loadWishes();

    }
);


// ========================================
// DEBUG
// ========================================

console.log(
    "Wedding Wish system aktif ✅"
);

console.log(
    "sendWish:",
    typeof sendWish
);

console.log(
    "addWishToPage:",
    typeof addWishToPage
);

console.log(
    "loadWishes:",
    typeof loadWishes
);

// ========================================
// DOWNLOAD QR CODE
// ========================================

function downloadQRCode() {

    const qrContainer =
        document.getElementById(
            "qrcode"
        );


    if (!qrContainer) {

        alert(
            "QR Code tidak ditemukan."
        );

        return;

    }


    const canvas =
        qrContainer.querySelector(
            "canvas"
        );


    const image =
        qrContainer.querySelector(
            "img"
        );


    // ========================================
    // JIKA QR BERUPA CANVAS
    // ========================================

    if (canvas) {

        const link =
            document.createElement(
                "a"
            );


        link.download =
            "QR-Code-Wedding-Andrew-Arletta.png";


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        return;

    }


    // ========================================
    // JIKA QR BERUPA IMAGE
    // ========================================

    if (image) {

        const link =
            document.createElement(
                "a"
            );


        link.download =
            "QR-Code-Wedding-Andrew-Arletta.png";


        link.href =
            image.src;


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        return;

    }


    alert(
        "QR Code belum tersedia."
    );

}

/* ==================================================
   LUXURY SCROLL REVEAL
   ANDREW & ARLETTA
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const animatedSections =
            document.querySelectorAll(
                ".couple-section, " +
                ".save-date, " +
                ".event-section, " +
                ".gallery-section, " +
                ".story-section, " +
                ".rsvp-section, " +
                ".wishes-section"
            );


        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.15
                }

            );


        animatedSections.forEach(
            function (section) {

                revealObserver.observe(
                    section
                );

            }
        );

    }
);

/* ==================================================
   🌸 FLOATING PETALS
================================================== */

function createPetal() {

    const petal =
        document.createElement("div");

    petal.className =
        "floating-petal";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.animationDuration =
        (10 + Math.random() * 10) + "s";

    petal.style.animationDelay =
        (Math.random() * 5) + "s";

    petal.style.opacity =
        (0.25 + Math.random() * 0.5);

    petal.style.transform =
        "rotate(" +
        Math.random() * 360 +
        "deg)";

    document.body.appendChild(petal);


    setTimeout(
        () => {
            petal.remove();
        },
        22000
    );

}


/* Buat kelopak secara berkala */

setInterval(
    createPetal,
    1800
);

/* ==================================================
   💳 COPY BANK ACCOUNT
================================================== */

function copyAccountNumber(elementId, button) {

    const accountElement =
        document.getElementById(elementId);

    if (!accountElement) return;

    const accountNumber =
        accountElement.innerText.trim();

    navigator.clipboard.writeText(accountNumber)
        .then(() => {

            const originalText =
                button.innerText;

            button.innerText =
                "✓ BERHASIL DISALIN";

            setTimeout(() => {

                button.innerText =
                    originalText;

            }, 2000);

        })
        .catch(() => {

            alert(
                "Nomor rekening: " +
                accountNumber
            );

        });

}
