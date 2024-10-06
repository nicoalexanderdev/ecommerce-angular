import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { loginInterface } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.username = this.loginForm.get('username')?.value;
    this.password = this.loginForm.get('password')?.value;
    let dataLogin: loginInterface = {
      username: this.username,
      password: this.password
    }
    console.log(dataLogin)
    if (this.loginForm.valid) {
      this.authService.login(dataLogin).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          localStorage.setItem('username', response.user.username);
          this.router.navigate(['/tienda']);
        },
        error: (error) => {
          console.log('Hubo un error', error);
        }
      })
    }
  }

}
