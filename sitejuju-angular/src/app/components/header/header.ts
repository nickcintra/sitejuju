import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavMenu } from '../nav-menu/nav-menu';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NavMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
