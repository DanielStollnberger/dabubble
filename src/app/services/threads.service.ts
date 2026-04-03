import { inject, Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { DashboardStateService } from "../state/dashboard-state.service";

@Injectable({
    providedIn: 'root',
  })
  export class ThreadService {
    firestore = inject(Firestore)
    dashboardState = inject(DashboardStateService);
  
    getThreadData(threadId:any) {
      return 2
    }
  }
  