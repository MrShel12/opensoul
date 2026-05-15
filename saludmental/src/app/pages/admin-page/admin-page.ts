import { Component, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css'
})
export class AdminPage implements OnDestroy {

  private reportsSubscription?: Subscription;

  username = '';

  password = '';

  logged = false;

  reports:any[] = [];

  constructor(private firestore: Firestore){}

  login(){

    if(
      this.username === 'admin'
      &&
      this.password === '1234'
    ){

      this.logged = true;

      this.listenToReports();

    }

  }

  async markReviewed(report:any){
    await this.updateReport(report, {
      status:'reviewed'
    });
  }

  async banUser(report:any){
    await setDoc(
      doc(this.firestore, `bannedUsers/${encodeURIComponent(report.user)}`),
      {
        user:report.user,
        room:report.room,
        banned:true,
        createdAt:serverTimestamp()
      }
    );

    await this.updateReport(report, {
      status:'banned',
      banned:true
    });
  }

  async stopConversation(report:any){
    await setDoc(
      doc(this.firestore, `stoppedRooms/${report.room}`),
      {
        room:report.room,
        stopped:true,
        createdAt:serverTimestamp()
      }
    );

    await this.updateReport(report, {
      status:'stopped',
      stopped:true
    });
  }

  ngOnDestroy(){
    this.reportsSubscription?.unsubscribe();
  }

  private listenToReports(){
    this.reportsSubscription?.unsubscribe();

    const reportsQuery = query(
      collection(this.firestore, 'moderationReports'),
      orderBy('createdAt', 'desc')
    );

    this.reportsSubscription = collectionData(reportsQuery, { idField:'id' })
      .subscribe((reports) => {
        this.reports = reports;
      });
  }

  private async updateReport(report:any, changes:any){
    await updateDoc(
      doc(this.firestore, `moderationReports/${report.id}`),
      {
        ...changes,
        reviewedAt:serverTimestamp()
      }
    );
  }

}
