import { Component, OnDestroy,ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    LayoutModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [Router]
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('snav') sidenav: any;
  isHandset = false; // Flag for mobile/desktop detection
  selectedValue = 'home'; // Initial value for dropdown

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isHandset = result.matches;
    });
  }

  navigate(value: string) {
    this.router.navigate([value]); // Handle navigation based on selected value
  }


  ngOnDestroy(): void {} // Empty for now (no cleanup needed)
 
}
