window.onload = () => {
    const form = document.getElementById('form');
    const updateInput = document.getElementById('createdDate');
    const blogUpdate = document.getElementById('blogUpdate');

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDay();

        const formatMonth = month < 10 ? `0${month}` : month;
        const formatDay = day < 10 ? `0${day}` : day;

        return `${year}-${formatMonth}-${formatDay}`
    }
    
    const quill = new Quill('#editor', {
        modules: {
            toolbar: {
                container: 
            [   
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                ['bold', 'italic', 'underline', 'strike'], 
                [ 'image', 'video', 'formula'],
                [{ 'header': 1 }, { 'header': 2 }],
            ],
                handlers: {
                // handlers object will be merged with default handlers object
                image: function (value) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        const file = input;

                        if(!file) return;
                        console.log(file.files[0]);
                        const formData = new FormData();
                        formData.enctype = "multipart/form-data"
                        formData.append('image', file.files[0]);

                        const res = await fetch('api/upload', {
                            method: 'POST',
                            body: formData
                        });

                        const range = this.quill.getSelection(true);
                        const data = await res.json();
                        this.quill.insertEmbed(range.index, 'image', data, Quill.sources.USER);
                    }

                }
            }
            
        }
        },
        theme: 'snow'
    });

    if(window.__DELTA__) {
        quill.setContents(JSON.parse(window.__DELTA__))
    }

    
    form.onsubmit = () => {
        const delta = document.createElement('textarea');
        const html = document.createElement('textarea');
        html.style.display = "none";
        html.name = "browser";
        html.value = `${JSON.stringify(quill.getText())}`;
    
        delta.style.display = "none";
        delta.name = "description";
        delta.value = `${JSON.stringify(quill.getContents().ops)}`;
        form.append(delta, html);
    }

    // updateInput.value = getCurrentDate();
}