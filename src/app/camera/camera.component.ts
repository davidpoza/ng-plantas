import { AfterViewInit, Component, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit {
  width!: number;
  height!: number;
  @Output() capturedPhoto: EventEmitter<DataTransfer> = new EventEmitter<DataTransfer>();
  @ViewChild("video") public video!: ElementRef;
  @ViewChild("canvas") public canvas!: ElementRef;
  error: any;
  isCaptured: boolean = false;

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          const stream_settings = stream.getVideoTracks()[0].getSettings();
          this.width = stream_settings?.width || 0;
          this.height = stream_settings?.height || 0;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "Es necesario aceptar los permisos para poder capturar fotos desde la app.";
          window.alert(this.error);
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.isCaptured = true;
    this.canvas.nativeElement.toBlob((blob: any) => {
      const file = new File( [ blob ], "mycanvas.png" );
      const dT = new DataTransfer();
      dT.items.add( file );
      this.capturedPhoto.emit(dT);

    });
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.width, this.height);
  }
}

