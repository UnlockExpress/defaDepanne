// ========== MENU MOBILE ==========
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('open'));

    document.querySelectorAll('.menu a').forEach(a =>
        a.addEventListener('click', () => menu.classList.remove('open'))
    );
}

// ========== FAQ ACCORDÉON ==========
// Sélectionne tous les <details> dans la zone .faq
const faqItems = document.querySelectorAll('.faq details');

faqItems.forEach((item) => {
    item.addEventListener('toggle', function () {
        // Si cet élément vient de s'ouvrir
        if (this.open) {
            // Ferme tous les autres éléments .faq details
            faqItems.forEach((other) => {
                if (other !== this && other.open) {
                    other.open = false;
                }
            });
        }
    });
});

// ========== VALIDATION DU FORMULAIRE DE CONTACT ==========
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const submitBtn = form.querySelector('.form-submit');

    // Créer un conteneur pour les messages d'erreur s'il n'existe pas déjà
    function addErrorMessages() {
        const groups = form.querySelectorAll('.form-group');
        groups.forEach(group => {
            if (!group.querySelector('.error-msg')) {
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-msg';
                errorSpan.style.color = '#ff6b6b';
                errorSpan.style.fontSize = '0.75rem';
                errorSpan.style.marginTop = '6px';
                errorSpan.style.display = 'block';
                group.appendChild(errorSpan);
            }
        });
    }

    // Nettoyer les messages d'erreur
    function clearErrors() {
        const errors = form.querySelectorAll('.error-msg');
        errors.forEach(err => err.textContent = '');
    }

    // Valider le champ Nom
    function validateName(input) {
        const value = input.value.trim();
        if (value.length < 2) {
            return 'Nom complet (minimum 2 caractères)';
        }
        return '';
    }

    // Valider le champ Téléphone (format français ou 10 chiffres)
    function validatePhone(input) {
        const value = input.value.trim();
        const phoneRegex = /^(0[1-9])([-. ]?[0-9]{2}){4}$|^(\+33|0033)[1-9][0-9]{8}$/;
        const digitsOnly = value.replace(/[\s.-]/g, '');
        if (digitsOnly.length !== 10 || !/^0[1-9]/.test(digitsOnly)) {
            return 'Téléphone invalide (ex: 06 12 34 56 78)';
        }
        return '';
    }

    // Valider l'adresse
    function validateAddress(input) {
        const value = input.value.trim();
        if (value.length < 3) {
            return 'Ville / adresse trop courte (minimum 3 caractères)';
        }
        return '';
    }

    // Valider le select
    // Valider le select (ne doit pas être l'option par défaut)
    function validateService(select) {
        const value = select.value;
        if (!value || value === "" || select.selectedIndex === 0) {
            return 'Veuillez sélectionner un type de service';
        }
        return '';
    }

    // Valider le message
    function validateMessage(textarea) {
        const value = textarea.value.trim();
        if (value.length < 10) {
            return 'Veuillez décrire votre problème (minimum 10 caractères)';
        }
        return '';
    }

    // Validation globale
    function validateForm() {
        clearErrors();

        const nameInput = form.querySelector('input[placeholder="Nom complet"]');
        const phoneInput = form.querySelector('input[placeholder="Téléphone"]');
        const addressInput = form.querySelector('input[placeholder="Ville / adresse"]');
        const serviceSelect = form.querySelector('select');
        const messageTextarea = form.querySelector('textarea');

        let isValid = true;

        // Nom
        const nameError = validateName(nameInput);
        if (nameError) {
            const errorSpan = nameInput.closest('.form-group').querySelector('.error-msg');
            errorSpan.textContent = nameError;
            isValid = false;
        }

        // Téléphone
        const phoneError = validatePhone(phoneInput);
        if (phoneError) {
            const errorSpan = phoneInput.closest('.form-group').querySelector('.error-msg');
            errorSpan.textContent = phoneError;
            isValid = false;
        }

        // Adresse
        const addressError = validateAddress(addressInput);
        if (addressError) {
            const errorSpan = addressInput.closest('.form-group').querySelector('.error-msg');
            errorSpan.textContent = addressError;
            isValid = false;
        }

        // Message
        const messageError = validateMessage(messageTextarea);
        if (messageError) {
            const errorSpan = messageTextarea.closest('.form-group').querySelector('.error-msg');
            errorSpan.textContent = messageError;
            isValid = false;
        }

        // Service (select)
        const serviceError = validateService(serviceSelect);
        if (serviceError) {
            const errorSpan = serviceSelect.closest('.form-group').querySelector('.error-msg');
            errorSpan.textContent = serviceError;
            isValid = false;
        }

        return isValid;
    }

    // Gestion de l'envoi
    function handleSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
            // Simuler l'envoi (vous pourrez remplacer par fetch/ajax)
            alert('✅ Demande envoyée avec succès ! Un dépanneur vous contactera rapidement.');
            form.reset(); // Réinitialiser le formulaire
            clearErrors();
        } else {
            // Faire défiler jusqu'au premier champ en erreur
            const firstError = form.querySelector('.error-msg:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // Initialisation
    addErrorMessages();
    submitBtn.addEventListener('click', handleSubmit);
});