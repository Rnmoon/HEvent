#!/bin/bash

# ==============================================================================
# Database Backup Script for HEvent
# ==============================================================================
# This script creates a logical backup of the PostgreSQL database using pg_dump.
# It can be set up as a cron job to run daily.
# Let POSTGRES_URL environment variable containing the database connection string.
# Example: POSTGRES_URL="postgres://user:password@host:port/dbname"

# Exit immediately if a command exits with a non-zero status.
set -e

# Load environment variables
if [ -f "../.env" ]; then
  source ../.env
  export POSTGRES_URL=$DATABASE_URL
fi

if [ -z "$POSTGRES_URL" ]; then
  echo "Error: POSTGRES_URL or DATABASE_URL is not set."
  exit 1
fi

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "Starting database backup..."

# Run pg_dump
pg_dump "$POSTGRES_URL" -F p -f "$BACKUP_FILE"

echo "Database backup completed successfully: $BACKUP_FILE"

# Optional: Upload to S3
# if [ -n "$S3_BUCKET" ]; then
#   echo "Uploading to S3..."
#   aws s3 cp "$BACKUP_FILE" "s3://$S3_BUCKET/backups/db_backup_$TIMESTAMP.sql"
#   echo "Upload completed."
# fi

# Cleanup old backups (keep last 7 days)
find "$BACKUP_DIR" -type f -name "*.sql" -mtime +7 -delete
echo "Old backups cleaned up."
