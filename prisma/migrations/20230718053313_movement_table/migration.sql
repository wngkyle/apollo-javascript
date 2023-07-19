-- CreateTable
CREATE TABLE "Movement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "targetMuscle" TEXT NOT NULL,
    "movementPattern" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "skillLevel" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
