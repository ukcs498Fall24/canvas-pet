import { Assignment } from "./Assignment"

export class CanvasIntegrator {
  private uuid?: string
  private saveFile?: string // temp
  private initialized: boolean = false
  private knownAssignments?: Assignment[]
  private activeAssignments?: Assignment[]

  // Start is called before the first frame update
  public start(): void {
    if (!this.initialized) {
      this.onFirstRun()
    } else {
      this.pullUpdates()
    }
  }

  public pullUpdates(): void {
    // Implementation here
  }

  private onFirstRun(): void {
    this.initialized = true
  }

  private assignmentChecker(newAssignments: Assignment[]): Assignment[] {
    const updates: Assignment[] = newAssignments
    for (const assignment of updates) {
      // Implementation here
    }
    return updates
  }

  private validAssignment(assignment: Assignment): boolean {
    let valid: boolean = true
    if (assignment == null) {
      valid = false
    } else if (!assignment.canSubmit()) {
      valid = false
    }
    return valid
  }
}
