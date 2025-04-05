-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membershipPlan" "MembershipPlan" DEFAULT 'BASIC';

-- CreateIndex
CREATE INDEX "idx_heading" ON "Blog"("heading");

-- CreateIndex
CREATE INDEX "idx_username" ON "User"("username");

-- CreateIndex
CREATE INDEX "idx_email" ON "User"("email");
