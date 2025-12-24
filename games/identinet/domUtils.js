/**
 * This plugin is distributed under an MIT license.
 * Developed by TristanMX/Pixel Perfect Studio
 * Website: https://www.pixelperfectstudio.mx/ 
 * Docs: https://smartui-docs.pixelperfectstudio.mx/miscellaneous-addons/newgrounds.io-plugin
 */
class NGIONotificationManager {
    static #singleton = null;

    static LOCKED_ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAACXBIWXMAAAHxAAAB8QGeuW1nAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAA50RVh0VGl0bGUARlNNIEljb26t/l/gAAAAFnRFWHRBdXRob3IAQW5nZWwgSGVybmFuZGV6+PBx7AAAAtdJREFUOI1tUktIVGEU/s69/73zyDBDQysVvTM5OqYLrSF70dMoWli0aRHRw0WLHouIFlFt2xW0iV66adODICiihUnRojaFQ5oXs8QIotTKe8d77/+fFuOMM9oHBw7nfN85h+//iZlRiLp4Y6cpVHdzpbGpNEJLplyeTH8PXnoB3RgZ/vi8kEs5cWVr66IyL9PbvT6y79i6cBA1SeRIjsfBzTcz4sZr9/6EGTr8/f376byYiPRkMvH09sGSLW3VQgCA/UN6YxPKqFmq+Va5bgLA26+BPHbv74t0enAPM0sBAHVW4uj5HZHtbdWCfk4r/+xjJ+i3g6sMtgmIb46bJ6/sjRhraoQ4ty2y88JMw2EAt8DM2NDeOOT1pJTXk1L7tyR/W1YyxszIhWUlYwe2Jv94PSk1czelOtqbPjIztFgstixVK1ZpRNRvB/xuzL9k2wN2oTG2PWC/+yIvvxoJWNeIUrUiEY/HK4RPVF5eogEAxiaUBtJGa2tbyjAPFMLnL7+UBgtYVkLwgAoBpVW5ftbxlhU67240HswXZmGgZbnOYJDrMYj1StrY3vjh2YnSppCAnufxbKhcTnO5AmYCyM47k2kRK9ebQwyCV0xYMEBRvhZS0ONL9NWCFAgOLSB8+y39t+OBsbZK+MujujE3KMshRSQgCeRQ0abhSRXsfzL1+q+nrpWYdOZhZ9m62GJdFA2QgAYJwCXAmQ2X0DfiCSeQF0ftoUfTPl3oG/VFYR8OCsT5YjbWl5oyTPppItIiGk5tWGzKogVOdrPIiwvObjIM/Uh1tOs6J44fWRntSggju23WPGKAJM2K3YVOh7PmdYQlgdwCM3M8CQiSBHKKnYQCdkXDXFcjDjWYguEQze9DAoIlss15T2EpgyzDABQImYX/jQHW7Iw/nHEgkSHAI8AHEBSc9x+4CvKT73+i+vpVa1aGRW+TYTRoAP2fPgcFcNr3B8cz8tA/hu9sL/mtymQAAAAASUVORK5CYII=";
    static UNLOCKED_ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAACXBIWXMAAAHxAAAB8QGeuW1nAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAA50RVh0VGl0bGUARlNNIEljb26t/l/gAAAAFnRFWHRBdXRob3IAQW5nZWwgSGVybmFuZGV6+PBx7AAAArxJREFUOI2Fkk1IVFEUx//nvTvzcsYyPyaSGtJ5b/zIClrIWJR9bKJWWQSupAJpE1nhvlYFLdtV1CIIso9NEEEr+3DTqoJSVEqRQCjHr3mj894797QYp96o0YEL997z+597//dcEhGEozHdesyw6IJq295JmyqqZH5pzv/64w0K+u63seHXYZZK4nQ6bbFlPYr3dp6Onz8QUCyqSpDkvcB98F65994+y5vm2elPn1wAMEKFEqq1/kS896CmWFTx1JxXeDOqg28/PYpFVeXFo6i+f64rRnhORGbZyQCQamrqjGacV1AmCu/H75DoYSGyrc7mS1U3T0WM2rjKP/4g89df9E6MjdyHiJSNpOPYDQ1tW8N7tt3mNHUfW8x4T3SmMKBThzLDIoI14n+NRrulf+/gDe4Inkprf7c4jpNQIc9IJpMVhlG9AesEWfjOkzMGDqRhJDbCAxLKtpvb4WwZiOyoSVaezKj1hKWI7N4mEE2SXwaJuZXswx2fEy/7dsJS5h9KNERrQBjQGqJ5Za+4RsHjmTMPvyjTrtsl5JMsL4eAEBwWCReLajbNHRt3K7BPnMtCpBzQ0wu+/3E6ovbU+UatFRHRxaJaQ4QhHJAS9sFuFtCMEqAnF4LFq++GdN6/bcTUlfit9n1G/QZVyotmCHtQEvjgXBYIJbyhKYVl79rE+OjbxnRr1huaGowcry1duWgl8GEIe9BuFpzLgt0s2J0FOcSizMtEZCCCPtjCnMsWuRW27OQyTzVsmkcquhqCll7jkNWFzYtgt5RfsRcwlLC34ln/fTTNxblgv8gS2F1c0zLhGBQCH5ybXdVThqQgdJJ6UOcL5zxa3TIECkoCT7S7QGt6ajHJdg2IJiyt810BUfiFMZ6fs6HEXIusHxIYTLORcUqlmtq52n9ItV6zGKD/CUlDZCY6Ys5Ge34DhHcBgPWbbTgAAAAASUVORK5CYII=";
    static FILE_ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAATCAYAAACZZ43PAAAACXBIWXMAAAHxAAAB8QGeuW1nAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAA50RVh0VGl0bGUARlNNIEljb26t/l/gAAAAFnRFWHRBdXRob3IAQW5nZWwgSGVybmFuZGV6+PBx7AAAAZlJREFUOI2Fk79qG0EQh7/dW51SJDaGkEI4hQIRUjAhKdIEZOPW6Ww/gVsrkCqvkDYEUvkd0rk3bh1IaUWFDQLZjbEVIsWcdLuT4u6k+yOdF45jbuY3883snHrf3B68qbyuUXIEsMrx8/6MW4Y/Lnvne4nPbJhXte9rX5eKAyMEnnCn//Lt+gvPvfXdeqN5fNnrfgAwy4RTLxJOPCEwwlg5AD496VDR/s6LRvP0otfdLCSwGgLPReK4emCEMQ6rheEjy/7jA/5VVbv+snUySyCKKNgTJsbNhEmiqfbpSZ/Dmw5Og1OwWn26ZYAIM1cx8FzO1nx8d5RJ/OfXZ4zVwtgvVozsYivpuYRKMKGGkb8kMCbJC5OYUIMJSwkSocsIk0RWC8aWEWQqugUEkhDI7OrSFYq2y9ihBmMVjCqJYzHq3M767ZzAlaIubMVLDXHkp9EeaCUVMxtiliCHWnK98R7kCRJhfhOLiWxmDxZWXL5gUy2I4oE9yG9i/E4f1XzbHqw8a9WcAqfBKsEp4kewCpyOvknu15f+76v/MbXwzGymDxEAAAAASUVORK5CYII=";
    static QUESTIONMARK_ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAACXBIWXMAAAHxAAAB8QGeuW1nAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAA50RVh0VGl0bGUARlNNIEljb26t/l/gAAAAFnRFWHRBdXRob3IAQW5nZWwgSGVybmFuZGV6+PBx7AAAAjFJREFUKJF9kctLlFEYxn/nzPc1842jyVyaAa+Yi0wpWoRdREhIyEXLIFrkuj+mIAKXEa6qhdWmGwiBCkoXCVIaUdIIZxp0hrk4NXO+723haOMovnAWh/N7zvs876sidmQwfiL+OGbHmhWKo0oQMtVMMV1J31X9Tf1LCxcW+oI6eCS8VyW3xODi4JIVs2Oh42BRYLSgbYewP9ZsNQJF2eFXdROjhWgggW07GJ9Q1VDVggVQ8QlVLWS8ba7PD626ypsB8Gk99HT4w+mgvxWjwfWBNhqyjkvWcflsltnxypNrxeT4WjE5XnTLk4uVZbKOR9ZxMUqwqlrYdlyMhnzZxdP/7Xka8v7dz4zedWFtu9vFt7l3iNbMbr4u5P/mPiqlBoBELNQxYoXjdQJQQG+rExkDS/+tlDZOhmK3znZeG2mL9jW1x88FOtsuaqMF4xPuPxldUyKyb0Ep1XN54M7s7bGHCaMFo2Hj91fSuVX5vvI+s/Fz/lHjWBMtp3qcbC3T6vqMefX83otiIfUM+CYiS4f2ULY9soGaIPWpVCykHojI3N77YYElZB0Po4U/tndo842CleTiVC6vyq6HkPrypgAk64EDoWvBo0BX7fpDRLaO64CvNTLsC7bcBHAL+ZfA1AFARPYP0Bm6NJrunpiW7olpCV25kQHO1DO6oUF7oPe83453YMc7CPQM2EC4HmgUeIK3H0rEFeDAqBo33WQnuuasaCIMYLZSW9XN9asiUtpj/gGZzQ/jKAdkiAAAAABJRU5ErkJggg==";
    static NG_DEFAULT="https://img.ngfiles.com/wiki/uploads/968000/iu_968880_1.gif";
    
    static get instance(){
        if (this.#singleton==null)
            this.#singleton=new NGIONotificationManager();
        return this.#singleton;        
    }

    constructor() {
        this.notificationContainer = null;
        this.notifications = [];
        this.icons = {
            
        };

        this.notificationColors = {
            "medalunlock": { background: "#ff7f00", text: "#242424" },
            "secretmedalunlock": { background: "#2bc455", text: "#242424" },
            "savegame" : { background: "#242424", text: "#ff3effff" },
            "session" : { background: "#242424", text: "#fd633eff" }
        };
        this.createNotificationStyles();
        this.createNotificationContainer();
    }

    createNotificationStyles() {
        if (document.getElementById('notification-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.innerHTML = `
            .notification-container { position: fixed; top: 10px; right: 10px; display: flex; flex-direction: column; gap: 10px;z-index: 9999;}
            .notification { display: flex; flex-direction: column; border-radius: 8px; padding: 0; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); opacity: 0; transform: translateY(-20px); transition: opacity 0.3s, transform 0.3s; width: 250px; font-family: Arial, sans-serif; font-weight:bold; }
            .notification.show {opacity: 1;transform: translateY(0);}
            .notification img {width: auto;height: 24px;}
            .notification .notification-header {padding: 2px 6px; font-size: 8px; font-weight: bold; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;}
            .notification .notification-body { display: flex; align-items: center; padding: 6px; gap: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;}
            .notification .notification-body span { flex-grow: 1; font-size: 10px;}
            @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-10px); } 50% { transform: translateX(10px); } 75% { transform: translateX(-10px); } 100% { transform: translateX(0); }}
            .shake {animation: shake 0.5s ease;}
        `;
        document.head.appendChild(styles);
    }

    createNotificationContainer() {
        if (!this.notificationContainer) {
            this.notificationContainer = document.createElement('div');
            this.notificationContainer.classList.add('notification-container');
            document.body.appendChild(this.notificationContainer);
        }
    }

    replaceTokens(message, tokens) {
        return message.replace(/{(.*?)}/g, (_, token) => tokens[token] || '');
    }

    showNotification(data) {
        const title=data["title"];
        const message=data["message"];
        const tokens=data["tokens"];
        const type=data["type"];
        const duration=data["duration"];
        const imageURL=data["imageURL"]
        const notification = document.createElement('div');
        notification.classList.add('notification');

        const colors = this.notificationColors[type] || this.notificationColors.info;
        
        const headerElement = document.createElement('div');
        headerElement.classList.add('notification-header');
        headerElement.style.backgroundColor = colors.text; 
        headerElement.textContent = title;
        notification.appendChild(headerElement);

        const bodyElement = document.createElement('div');
        bodyElement.classList.add('notification-body');
        bodyElement.style.backgroundColor = colors.background;
        bodyElement.style.color = colors.text;

        const iconElement = document.createElement('img');        
        if (imageURL!==undefined&&imageURL!="")
            iconElement.src=imageURL;
        else
            if (this.icons.hasOwnProperty(type)){
                iconElement.src = this.icons[type] || this.icons.info; 
            }
            else 
                iconElement.src=NGIONotificationManager.NG_DEFAULT;
            
        bodyElement.appendChild(iconElement);

        let finalMessage = message;
        if (tokens.hasOwnProperty("refname"))
            finalMessage+="<br><strong>Invalid Name: {refname}</strong>";

        if (tokens.hasOwnProperty("obj"))
            finalMessage+="<br><strong>Object:</strong>{obj}<br><strong>Comp.Name:</strong> '{name}'<br><strong>UID: </strong>{uid}";

        const messageWithTokens = this.replaceTokens(finalMessage, tokens);
        
        const messageElement = document.createElement('span');
        messageElement.innerHTML = messageWithTokens;
        bodyElement.appendChild(messageElement);

        notification.appendChild(bodyElement);

        this.notificationContainer.appendChild(notification);
        this.notifications.push(notification);

        setTimeout(() => {
            notification.classList.add('show');

            if (type === 'secretmedalunlock') {
                setTimeout(() => {
                    notification.classList.add('shake');
                }, 300);
            }
        }, 10);

        if (this.notificationContainer.scrollHeight > window.innerHeight) {
            const oldestNotification = this.notifications.shift();
            oldestNotification.remove();
        }

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }
}

class DOMUtils {

    static get isModalOpen(){return this.#isModalOpen}
    static #isModalOpen=false;
    
    static displayTableModal(title, headers, data) {
        this.#isModalOpen=true;
        const modal = document.createElement('div');
        modal.classList.add('modal'); 
    
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content'); 
        modal.appendChild(modalContent);
    
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalContent.appendChild(modalHeader);
    
        const img = document.createElement('img');        
        const favicon = document.querySelector("link[rel='icon'], link[rel='shortcut icon']");
    
        if (favicon) {
            img.src = favicon.href;
        } else {
            img.src = "https://img.ngfiles.com/wiki/uploads/968000/iu_968880_1.gif";
        }        
        img.classList.add('modal-img'); 
    
        const h1 = document.createElement('h1');
        h1.textContent = title;
        modalHeader.appendChild(img);
        modalHeader.appendChild(h1);
    
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-btn'); 
        closeButton.textContent = 'X';
        closeButton.addEventListener('click', () => {
            this.#isModalOpen=false;
            document.body.removeChild(modal);
            document.body.style.pointerEvents = 'auto';  // Restaurar eventos después de cerrar el modal
            window.dispatchEvent(new CustomEvent("c3resume-runtime",{}));
        });
        modalHeader.appendChild(closeButton);
    
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container'); 
        modalContent.appendChild(tableContainer);
    
        const table = document.createElement('table');
        table.classList.add('modal-table'); 
        tableContainer.appendChild(table);
    
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        const tbody = document.createElement('tbody');
        data.forEach((rowData, index) => {
            const row = document.createElement('tr');
            row.classList.add(index % 2 === 0 ? 'even-row' : 'odd-row'); 
    
            const keys = Object.keys(rowData);
            keys.forEach(header => {
                const td = document.createElement('td');
                const cellData = rowData[header];                
                if (typeof cellData === 'string') {
                    const type = cellData.substring(0,4);
                    switch(type){
                        case "img:":
                            const imgUrl = cellData.substring(4); 
                            const imgCell = document.createElement('img');
                            imgCell.src = imgUrl;
                            imgCell.classList.add('img-cell'); 
                            td.className = "ng-icon";
                            td.appendChild(imgCell);
                            break;
                        case "btn:":
                            const btn = document.createElement("button");
                            const fields = cellData.substring(4).split(",");
                            for (let i = 0; i < fields.length; i++) {
                                switch(i) {
                                    case 0:
                                        btn.innerText = fields[0]; 
                                        btn.onclick = () => {                                            
                                            if (fields.includes("ng-close")){                                                
                                                document.body.removeChild(modal);
                                                this.#isModalOpen=false;
                                            }
                                            window.dispatchEvent(new CustomEvent("ng-action", {"detail": {"action": fields[0], "data": rowData}}));
                                        };
                                        break;
                                }
                            }
                            btn.classList.add("ng-action");
                            td.className = "ng-icon";
                            td.appendChild(btn);
                            break;
                        default:
                            td.textContent = cellData; 
                            td.className = "ng-textData";
                            break;
                    }
                } else if (typeof cellData === 'number') {
                    td.textContent = cellData; 
                    td.className = "ng-textData";
                } else {
                    td.textContent = cellData || ''; 
                    td.className = "ng-textData";
                }
    
                row.appendChild(td); 
            });
    
            tbody.appendChild(row); 
        });
        table.appendChild(tbody);
    
        document.body.appendChild(modal);
    
        // Deshabilitar eventos de mouse y touch en todo el body
        document.body.style.pointerEvents = 'none';
    
        const style = document.createElement('style');
        style.innerHTML = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                pointer-events: auto; /* Permite interacción con el modal */
            }
            .modal-content {
                background-color: #333;
                padding: 10px;
                border-radius: 8px;
                width: 80%;
                height: 100%;
                max-width: 80%;
                max-height: 90vh;
                overflow-y: clip;
                position: relative;                
                box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.5);
                opacity: 0.95;
            }
            .table-container {
                overflow-y: scroll;
                position: relative;
                max-height: 90%;
                padding: 0px 0px 0px 0px;
            }
            .modal-header {
                display: flex;
                background-color: #ff7f00;
                color: #333;
                padding: 5px;
                border-radius: 8px 8px 0 0;
                text-align: center;
                max-height: 10%;
                position: sticky; 
                top: 0; 
                z-index: 1; 
            }
            .modal-img {
                border-radius: 6px;
                width: auto;
                height: auto;
                max-height: 50px;
                object-fit: contain;
                filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.5)); 
            }
            .modal-header h1 {
                margin-left: 10px;
                font-family: sans-serif;
                font-size: 14pt;
                font-weight: bold;
                color: rgb(36, 36, 36);
            }
            .close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 5px 10px;
                cursor: pointer;
                background-color: rgb(36, 36, 36);
                color: rgb(244, 152, 66);
                font-weight: bold;
                border: none;
                border-radius: 15%;
                font-size: 16px;
            }
            .close-btn:hover {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 5px 10px;
                cursor: pointer;
                background-color: rgb(122, 244, 66);
                color: rgb(36,36,36);
                font-weight: bold;
                border: 2pt;
                border-radius: 15%;
                font-size: 16px;
            }
            .ng-action {
                cursor: pointer;
                text-align:center;
                background-color: rgb(204, 88, 189);
                color: rgb(36,36,36);
                font-weight: bold;
                border: none;
                border-radius: 4px;
                display: inline-block;
                width:80%;
                font-size: 12px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
            }
            .ng-action:hover {
                cursor: pointer;
                text-align:center;
                background-color: rgb(122, 244, 66);
                color: rgb(36,36,36);
                font-weight: bold;
                border: none;
                border-radius: 4px;
                display: inline-block;
                width:80%;
                font-size: 12px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
            }
            .modal-table {
                width: 100%;
                border-collapse: collapse;                
            }
            .modal-table th {
                background-color:rgb(36, 36, 36);
                color:rgb(244, 152, 66);
                padding: 10px;
                text-align: left;
                font-weight: bold;
                font-family: sans-serif;
                font-size: 8pt;
                position: sticky; 
                top: 0; 
                z-index: 1; 
            }
            .ng-icon {
                padding: 8px;
                text-align: center;
                border: 1px solid #444;
                font-family: sans-serif;
                font-size:10pt;
                object-fit: contain;
                widht:auto;
                height:auto;
            }
            .ng-textData {
                padding: 8px;
                text-align: left;
                border: 1px solid #444;
                font-family: sans-serif;
                font-size:10pt;                
            }
            .even-row {
                background-color: #444;
                color: #f4c542;
            }
            .odd-row {
                background-color: #555;
                color: #f4c542;
            }
            .img-cell {
                width: auto; 
                max-height: 50px;
                object-fit: contain;
                justify-content: center;
                align-items: center; 
            }
            .table-container::-webkit-scrollbar {
                width: 10px;  
            }
            .table-container::-webkit-scrollbar-track {
                background-color: #333;
                border-radius: 10px; 
            }
            .table-container::-webkit-scrollbar-thumb {
                background-color: #555;
                border-radius: 10px; 
                border: 2px solid #333; 
            }
            .table-container::-webkit-scrollbar-thumb:hover {
                background-color: #777; 
            }
        `;
        document.head.appendChild(style);
    }    

    static convertImageToBase64(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.blob()) 
                .then(blob => {
                    const reader = new FileReader();
                    
                    reader.onloadend = function() {
                        resolve(reader.result); 
                    };
                    
                    reader.onerror = (error)=>{
                        reject(error);
                    };
                    
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    reject('Error when converting the image to Base64: ' + error);
                });
        });
    }

    static convertMultipleImagesToBase64(urls) {
        const promises = urls.map(url => DOMUtils.convertImageToBase64(url)); 
        return Promise.all(promises); 
    }
    
}