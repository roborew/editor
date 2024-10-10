import { Controller } from "@hotwired/stimulus";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import CodeTool from "@editorjs/code";

// Connects to data-controller="editor"
export default class extends Controller {
  static targets = ["article_content"];
  connect() {
    console.log("Editor controller connected", this.element);
    const initialContent = this.getInitialContent();
    this.contentEditor = new EditorJS({
      holder: this.article_contentTarget,
      data: initialContent,
      tools: {
        header: {
          class: Header,
        },
        list: {
          class: List,
        },
        paragraph: {
          class: Paragraph,
          config: {
            inlineToolbar: true,
          },
        },
        code: CodeTool,
      },
    });
    this.element.addEventListener("submit", this.saveEditorData.bind(this));
  }

  getInitialContent() {
    const hiddenContentField = document.getElementById(
      "article_content_hidden"
    );
    return hiddenContentField ? JSON.parse(hiddenContentField.value) : {};
  }

  async saveEditorData(event) {
    event.preventDefault();
    const outputData = await this.contentEditor.save();
    const articleForm = this.element;

    const hiddenInput = document.getElementById("article_content_hidden");
    hiddenInput.value = JSON.stringify(outputData);
    articleForm.submit();
  }
}
