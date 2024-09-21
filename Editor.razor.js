let quill, endpoint, editorInstance, BlockEmbed = Quill.import("blots/block/embed"); class ImageBlot extends BlockEmbed { static create(e) { let t = super.create(); return e && e.src ? (t.setAttribute("src", e.src), t.setAttribute("alt", e.alt), t.classList.add("quill-editor-image-border"), t) : (t.classList.add("unwanted"), t) } static value(e) { return { src: e.getAttribute("src"), alt: e.getAttribute("alt") } } update(e) { e.src && e.alt && (this.domNode.setAttribute("src", e.src), this.domNode.setAttribute("alt", e.alt)), this.domNode.classList.add("quill-editor-image-border") } } ImageBlot.blotName = "image", ImageBlot.tagName = "img", Quill.register(ImageBlot, !0), window.ImageResize && Quill.register("modules/imageResize", ImageResize); let toolbarOptions = [["bold", "italic", "underline", "strike"], ["blockquote", "code-block"], ["link", "image", "video"], [{ list: "ordered" }, { list: "bullet" }], [{ script: "sub" }, { script: "super" }], [{ indent: "-1" }, { indent: "+1" }], [{ size: ["small", !1, "large", "huge"] }], [{ header: [1, 2, 3, 4, 5, 6, !1] }], [{ color: [] }, { background: [] }], [{ font: [] }], [{ align: [] }],]; export const initQuill = (e, t, i, l, r) => { endpoint = t; let n = { toolbar: !i && { container: toolbarOptions, handlers: { image: imageHandler } }, imageResize: i ? void 0 : {} }; var a = { debug: "info", theme: r, modules: n, placeholder: l, readOnly: i, formats: i ? [] : ["bold", "italic", "underline", "strike", "blockquote", "code-block", "list", "header", "script", "size", "color", "background", "align", "font", "image", "video", "indent", "link"] }; quill = new window.Quill(e, a), e.classList.toggle("hide-toolbar", i), quill.root.addEventListener("drop", async e => { e.preventDefault(), e.stopPropagation(), droppedFileHandler(e) }) }; let droppedFileHandler = async e => { let t = e.dataTransfer.files[0]; if (!t || !isValidImage(t)) return console.error("Invalid image file"); if (t.size > 2097152) return console.error("Image size exceeds 2MB"); let i = await getBase64Image(e); null === i ? console.error("Error reading file") : insertImage(!1, i, t.name) }, getBase64Image = e => new Promise(t => { let i = new FileReader, l = e.dataTransfer.files[0]; i.onload = e => { t(e.target.result) }, i.onerror = () => { console.error("Error reading file"), t(null) }, i.readAsDataURL(l) }), removeInvalidImageTags = () => { quill.root.querySelectorAll("img.unwanted").forEach(e => e.remove()) }, isValidImage = e => ["image/gif", "image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/webp", "image/bmp", "image/vnd.microsoft.icon"].includes(e.type), getRange = () => quill.getSelection() || { index: quill.getLength(), length: 0 }; export const setQuillHTML = e => { if (quill && e) { let t = getRange(), i = quill.root.innerHTML; quill.root.innerHTML = `${i}${e}`, quill.setSelection(t.index + e.length, 0) } }; export const getQuillHTML = async () => { if (quill) { let e = quill.root.innerHTML, t = splitContentIntoChunks(e, 16e3), i = t.map((e, i) => editorInstance.invokeMethodAsync("DataReceived", e, i, t.length)); await Promise.all(i) } }; let splitContentIntoChunks = (e, t) => { let i = []; for (let l = 0; l < e.length; l += t)i.push(e.slice(l, l + t)); return i }; export const setQuillContents = e => { if (quill) { let t = Quill.import("delta"), i = JSON.parse(e), l = new t(i.ops); quill.setContents(l) } }; export const getQuillContents = async () => { if (quill) { let e = quill.getContents(), t = JSON.stringify(e), i = splitContentIntoChunks(t, 16e3), l = i.map((e, t) => editorInstance.invokeMethodAsync("DataReceived", e, t, i.length)); await Promise.all(l) } }; let imageHandler = async () => { await editorInstance.invokeMethodAsync("ShowImageModal") }; export const fetchImagesAsync = async () => { try { let e = await (await fetch(endpoint)).json(); return JSON.stringify(e.map(e => ({ src: e.trim(), alt: e.split("/").pop() }))) } catch (t) { return console.error("Error fetching images"), JSON.stringify([]) } }; export const insertImage = (e, t, i) => { let l = getRange(), r = t.trim(); if (e && (i = r.split("/").pop().split("?")[0] || "image", !/\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(i))) return console.error("Invalid image URL"); quill.insertEmbed(l.index, "image", { src: r, alt: i }), quill.insertText(l.index + 1, "\n"), quill.setSelection(l.index + 2, 0), setTimeout(removeInvalidImageTags(), 50) }; export const registerEditorInstance = e => { editorInstance = e };