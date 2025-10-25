async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    for (let element of elements) {
        const file = element.getAttribute('data-include');
        
        try {
            const response = await fetch(file);
            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;
            } else {
                console.error(`Erro ao carregar ${file}: ${response.status}`);
                element.innerHTML = `<p>Erro ao carregar conteúdo de ${file}</p>`;
            }
        } catch (error) {
            console.error(`Erro ao buscar ${file}:`, error);
            element.innerHTML = `<p>Erro ao carregar conteúdo de ${file}</p>`;
        }
    }
}

// Chama a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', includeHTML);

// Alternativa usando jQuery (se você usar jQuery)
$(document).ready(function() {
    $('[data-include]').each(function() {
        const element = this;
        const file = $(this).data('include');
        
        $.get(file)
            .done(function(data) {
                $(element).html(data);
            })
            .fail(function() {
                console.error(`Erro ao carregar ${file}`);
                $(element).html(`<p>Erro ao carregar conteúdo de ${file}</p>`);
            });
    });
});