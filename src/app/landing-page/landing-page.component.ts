import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('necessidadeInput')
  public necessidadeInput!: ElementRef<HTMLInputElement>;

  public necessidade: string = '';

  public AIResponse: string = '';

  public frases: string[] = [
    'Qual a necessidade do seu negócio?',
    'Como podemos automatizar seus processos?',
    'Nos conte sobre sua idéia...',
    'Escreva sua necessidade...',
  ];

  public fraseAtual = 0;

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.isLoadingSubject.asObservable();

  private isAIDisabledSubject = new BehaviorSubject<boolean>(false);

  public isAIDisabled$ = this.isAIDisabledSubject.asObservable();

  public formContact = this.fb.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', Validators.required],
    tel: ['', Validators.required],
    subject: ['', Validators.required],
    textarea: [''],
  });

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.animarPlaceholder(this.frases[this.fraseAtual]);
  }

  private animarPlaceholder(texto: string): void {
    const input = this.necessidadeInput.nativeElement;
    const atual = input.placeholder;
    let i = atual.length;

    const apagar = () => {
      if (i >= 0) {
        input.placeholder = atual.substring(0, i);
        i--;
        setTimeout(apagar, 30);
      } else {
        escrever();
      }
    };
    let j = 0;
    const escrever = () => {
      if (j <= texto.length) {
        input.placeholder = texto.substring(0, j);
        j++;
        setTimeout(escrever, 50);
      } else {
        setTimeout(() => {
          this.fraseAtual = (this.fraseAtual + 1) % this.frases.length;
          this.animarPlaceholder(this.frases[this.fraseAtual]);
        }, 3000);
      }
    };

    apagar();
  }

  public contact(): void {
    this.isLoadingSubject.next(true);
    console.log(this.formContact.value);
  }

  public callAI(): void {
    if (this.necessidade.length > 10) {
      console.log(this.necessidade);
      this.AIResponse = 'Resposta da AI';
      this.isAIDisabledSubject.next(true);
    }
  }
}
