console.log('Funciona')

document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-zone")

    dropZoneElement.addEventListener('click', e => {
        inputElement.click()
    })

    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0])
        }
    })

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault()
        dropZoneElement.classList.add("drop-zone--over")
    })
        
    const dragEvents = ["dragleave", "dragend"]
    dragEvents.forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            console.log('Funciona dragleave dragend')
            dropZoneElement.classList.remove("drop-zone--over")
        })
    })

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault()

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0])
        }

        dropZoneElement.classList.remove("drop-zone--over")
    })

})

/**
 * Updates the thumbnail on a drop zone element
 * 
 * @param {HTMLElement} dropZoneElement 
 * @param {File} files 
 */
const updateThumbnail = (dropZoneElement, file) => {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb")

    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove()
    }

    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div")
        thumbnailElement.classList.add("drop-zone__thumb")
        dropZoneElement.appendChild(thumbnailElement)
    }

    thumbnailElement.dataset.label = file.name

    // Show thumbnail for image file
    if (file.type.startsWith("image/")) {
        const reader = new FileReader()

        console.log(reader)
        
        reader.readAsDataURL(file)
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`
        }
    } else {
        thumbnailElement.style.backgroundImage = 'url(./img/file-explorer.png)'
    }
}