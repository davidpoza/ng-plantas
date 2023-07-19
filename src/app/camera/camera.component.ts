import { AfterViewInit, Component, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit {
  WIDTH = 640;
  HEIGHT = 480;

  @Output() capturedPhoto: EventEmitter<DataTransfer> = new EventEmitter<DataTransfer>();

  @ViewChild("video") public video!: ElementRef;
  @ViewChild("canvas") public canvas!: ElementRef;

  captures: string[] = [];
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
            facingMode: 'environment'
          }
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          window.alert("You have no output video device")
          this.error = "You have no output video device";
        }
      } catch (e) {
        window.alert(e)
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
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
}

