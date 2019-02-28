import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appFileDrop]',
})

export class FileDropDirective {
  @Output('appFileDrop') fileDrop = new EventEmitter<File[]>();
  @Input() preventBodyDrop = true;

  @HostBinding('class.file-drop-active')
  active = false;

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.active = false;

    const { dataTransfer } = event;

    if (dataTransfer !== null) {
      const files: File[] = [];
      for (let i = 0; i < dataTransfer.items.length; i++) {
        if (dataTransfer.items[i].kind === 'file') {
          files.push(dataTransfer.items[i].getAsFile() as File);
        }
      }
      dataTransfer.items.clear();
      this.fileDrop.emit(files);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.active = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(_event: DragEvent) {
    this.active = false;
  }

  @HostListener('body:dragover', ['$event'])
  onBodyDragOver(event: DragEvent) {
    if (this.preventBodyDrop) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('body:drop', ['$event'])
  onBodyDrop(event: DragEvent) {
    if (this.preventBodyDrop) {
      event.preventDefault();
    }
  }
}
