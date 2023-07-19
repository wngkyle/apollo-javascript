/*
  Warnings:

  - Added the required column `exercise` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
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
    "description" TEXT NOT NULL
);
INSERT INTO "new_Movement" ("createdAt", "description", "equipment", "id", "movementPattern", "name", "skillLevel", "targetMuscle") SELECT "createdAt", "description", "equipment", "id", "movementPattern", "name", "skillLevel", "targetMuscle" FROM "Movement";
DROP TABLE "Movement";
ALTER TABLE "new_Movement" RENAME TO "Movement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
