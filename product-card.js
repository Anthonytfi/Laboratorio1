class ProductCard extends HTMLElement {
    constructor() {
        super();
        // Adjuntar el Shadow DOM al componente
        this.attachShadow({ mode: 'open' });

        // Obtener el template desde index.html
        const template = document.getElementById('product-card-template');

        // Clonar el contenido del template
        const templateContent = template.content.cloneNode(true);

        // Adjuntar el contenido clonado al Shadow Root
        this.shadowRoot.appendChild(templateContent);

        // Inicializar los elementos para actualizar dinámicamente
        this.titleElement = this.shadowRoot.querySelector('slot[name="title"]').parentElement; // El <h3> que contiene el slot title
        this.priceElement = this.shadowRoot.querySelector('slot[name="price"]').parentElement; // El <span> que contiene el slot price
        this.imageSlot = this.shadowRoot.querySelector('slot[name="image"]'); // Slot para la imagen

        // Depuración: Verificar si el slot de la imagen se encuentra
        console.log('Image Slot:', this.imageSlot);

        // Inicializar el selector de cantidad
        this.quantityValue = this.shadowRoot.querySelector('.quantity-value');
        this.decreaseButton = this.shadowRoot.querySelector('.decrease');
        this.increaseButton = this.shadowRoot.querySelector('.increase');
        this.quantity = 1;

        this.decreaseButton.addEventListener('click', () => {
            if (this.quantity > 1) {
                this.quantity--;
                this.quantityValue.textContent = this.quantity;
            }
        });

        this.increaseButton.addEventListener('click', () => {
            this.quantity++;
            this.quantityValue.textContent = this.quantity;
        });

        // Establecer valores iniciales desde los atributos
        this.updateFromAttributes();
    }

    // Definir los atributos que se observarán
    static get observedAttributes() {
        return ['title', 'price', 'image'];
    }

    // Manejar cambios en los atributos
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'title':
                    if (this.titleElement) {
                        this.titleElement.textContent = newValue || 'Título del producto';
                        console.log('Title updated to:', newValue); // Depuración
                    }
                    break;
                case 'price':
                    if (this.priceElement) {
                        this.priceElement.textContent = newValue || 'Precio no disponible';
                        console.log('Price updated to:', newValue); // Depuración
                    }
                    break;
                case 'image':
                    // No necesitamos actualizar el src aquí, ya que usamos el slot para la imagen
                    console.log('Image attribute changed to:', newValue); // Depuración
                    break;
            }
        }
    }

    // Actualizar contenido basado en los atributos al inicio
    updateFromAttributes() {
        const title = this.getAttribute('title') || 'Título del producto';
        const price = this.getAttribute('price') || 'Precio no disponible';
        // No necesitamos manejar la imagen aquí porque usamos el slot

        if (this.titleElement) {
            this.titleElement.textContent = title;
        }
        if (this.priceElement) {
            this.priceElement.textContent = price;
        }
    }
}

// Registrar el componente personalizado
customElements.define('product-card', ProductCard);