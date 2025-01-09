import {Component, Type} from '@angular/core';
import {BackupService} from '../../services/backup.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common'; // Import DatePipe


interface BackupEntry{
  type: string;
  setCount: string;
  startTime: string;
  completionTime: string;
  originalLine?: string;
}
@Component({
  selector: 'app-backup',
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    NgClass
  ],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})
export class BackupComponent {
  backupHistory: BackupEntry[] = [];
  loading = false;
  backupInProgress: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private backupService: BackupService) { }

  ngOnInit(): void {
    this.loadBackupHistory();
  }

  loadBackupHistory(): void {
    this.loading = true;
    this.errorMessage = null;
    this.backupService.getBackupHistory().subscribe({
      next: (history) => {
        this.backupHistory = this.parseBackupHistory(history);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load backup history.';
      },
      complete:() => {
        this.loading = false;
      }
    });
  }
  parseBackupHistory(history:string[]): BackupEntry[] {
    return history.map(line => {
      const matchType = line.match(/Type: ([^,]+)/);
      const matchSetCount = line.match(/Set Count: ([^,]+)/);
      const matchStartTime = line.match(/Start Time: ([^,]+)/);
      const matchCompletionTime = line.match(/Completion Time: ([^,]+)/);

      return {
        type: matchType ? matchType[1] : 'N/A',
        setCount: matchSetCount ? matchSetCount[1] : 'N/A',
        startTime: matchStartTime ? matchStartTime[1] : 'N/A',
        completionTime: matchCompletionTime ? matchCompletionTime[1] : 'N/A',
        originalLine: !matchType ? line : undefined // Store the original line if parsing fails
      };
    });
  }
  triggerFullBackup(): void {
    this.backupInProgress = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.backupService.triggerFullBackup().subscribe({
      next: (response) => {
        this.successMessage = response;
        this.loadBackupHistory()
        this.backupInProgress = false;
      },
      error: (error) => {
        this.errorMessage = error.error || 'Failed to trigger full backup.';
        this.backupInProgress = false;
      },
    });
  }


  triggerIncrementalBackup(): void {
    this.backupInProgress = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.backupService.triggerIncrementalBackup().subscribe({
      next:(response) => {
        this.successMessage = response;
        this.loadBackupHistory()
        this.backupInProgress = false;
      },
      error: (error) => {
        this.errorMessage = error.error || 'Failed to trigger incremental backup.';
        this.backupInProgress = false;
      },
    });
  }


}
