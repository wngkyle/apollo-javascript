-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "targetMuscle" TEXT NOT NULL,
    "movementPattern" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "skillLevel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postedById" INTEGER,
    CONSTRAINT "Movement_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Movement" ("createdAt", "description", "equipment", "exercise", "id", "movementPattern", "name", "skillLevel", "targetMuscle") SELECT "createdAt", "description", "equipment", "exercise", "id", "movementPattern", "name", "skillLevel", "targetMuscle" FROM "Movement";
DROP TABLE "Movement";
ALTER TABLE "new_Movement" RENAME TO "Movement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
