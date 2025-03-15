.PHONY: venv install run test lint lint-fix clean help

SHELL := /bin/bash

venv:
		@if [ ! -d .venv ]; then \
				echo "Creating virtual environment..."; \
				python3 -m venv .venv && \
				. .venv/bin/activate && \
				pip install --upgrade pip; \
		else \
				echo "Virtual environment already exists."; \
		fi

install:
		@echo "Installing dependencies..."
		. .venv/bin/activate && pip install -r requirements.txt && pip freeze > requirements.lock

run:
		@echo "Starting Flask server..."
				. .venv/bin/activate && FLASK_APP=app.py flask run --port=2024
test:
		@echo "Running tests..."
		. .venv/bin/activate && pytest

lint:
		@echo "Running lint checks..."
		. .venv/bin/activate && \
		echo "Running Black formatting check..." && \
		black --check . && \
		echo "Running isort check..." && \
		isort --check-only . && \
		echo "Running flake8 lint checks..." && \
		flake8 .

lint-fix:
		@echo "Fixing lint issues..."
		. .venv/bin/activate && \
		echo "Applying Black formatting..." && \
		black . && \
		echo "Sorting imports with isort..." && \
		isort . && \
		echo "Running flake8 lint checks..." && \
		flake8 .

clean:
		@echo "Cleaning up..."
		rm -rf .venv
		find . -type f -name '*.pyc' -delete
		find . -type d -name '__pycache__' -exec rm -r {} +

help:
		@echo "Makefile commands:"
		@echo "  make venv     - Create the virtual environment"
		@echo "  make install  - Install required dependencies"
		@echo "  make run      - Run the Flask server"
		@echo "  make test     - Run tests"
		@echo "  make lint     - Run linting"
		@echo "  make lint-fix - Auto fix linting issues"
		@echo "  make clean    - Remove the virtual environment and cleanup cache files"
