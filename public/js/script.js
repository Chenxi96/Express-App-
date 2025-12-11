window.onload = () => {
    const form = document.getElementById('form');
    const updateInput = document.getElementById('createdDate');
    const blogUpdate = document.getElementById('updatedDate');
    

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDay();

        const formatMonth = month < 10 ? `0${month}` : month;
        const formatDay = day < 10 ? `0${day}` : day;

        return `${year}-${formatMonth}-${formatDay}`
    }

    if(!updateInput.readonly) {
        updateInput.value = getCurrentDate();
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
                        const imagekit = new ImageKit({
                            publicKey: "public_T2HdIbpcwGI+SfclDpMuDn/g2oI=",
                            urlEndpoint: "https://ik.imagekit.io/76nhtc3tu",
                        });
                        const file = input;

                        if(!file) return;
                        console.log(file.files[0]);
                        const formData = new FormData();
                        formData.enctype = "multipart/form-data"
                        formData.append('image', file.files[0]);
                        console.log(formData)

                        const authRequest = await fetch('api/upload', {
                            method: "GET"
                        })

                        const authResponse = await authRequest.json();

                        if(!authRequest.ok) {
                            throw new Error("Failed to fetch auth details");
                        }

                        imagekit.upload({
                            file: file.files[0],
                            fileName: file.files[0].name,
                            tags: ["blogs"],
                            folder: "/blogs",
                            width: 1200,
                            height: 800,
                            token: authResponse.token,
                            signature: authResponse.signature,
                            expire: authResponse.expire
                        },(err, result) => {
                            if(err) {
                                throw new Error(err)
                            } else {
                                const range = this.quill.getSelection(true);
                                this.quill.insertEmbed(range.index, 'image', result.url, Quill.sources.USER);
                            }
                        })
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

        if(!updateInput.readonly) {
            updateInput.value = getCurrentDate();
        }

        blogUpdate.value = getCurrentDate();

        html.style.display = "none";
        html.name = "browser";
        html.value = `${JSON.stringify(quill.getText())}`;
    
        delta.style.display = "none";
        delta.name = "description";
        delta.value = `${JSON.stringify(quill.getContents().ops)}`;
        form.append(delta, html);
    }

}