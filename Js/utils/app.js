
export function formatNumber(input) {

    if (!input) return;

        // 1. Bloquear teclas no deseadas en tiempo de escritura
        input.addEventListener('keydown', function(e) {
            if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                e.preventDefault();
            }
        });

        // 2. Limpiar automáticamente si el usuario pega texto con letras o símbolos
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[eE\+\-\.]/g, '');
        });

    return input;
}

export function wordAfterTheHyphen(input) {
    return input.split('-')[1]?.trim() || "";
}