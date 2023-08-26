default:
    just --list

# Boots up the specified project

start PROJECT:
    echo "Starting project: {{PROJECT}}"
    npm --prefix "./{{PROJECT}}" run dev
