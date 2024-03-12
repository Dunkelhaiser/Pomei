# Pomei Software Requirements Specification

## 1. Introduction

### 1.1 Summary

The software will be a client-server web application that gives user the ability to store and organize personal notes.

### 1.2 Intendent Use

Pomei functions as a client-server web application. Users will primarily interact with the application through a WYSIWYG editor to create, read, and edit notes. The application will provide functionalities for organizing notes into folders with custom colors and icons, assigning tags for easy retrieval, and applying filters for searching notes by title, content, or tags. Additionally, Pomei will offer both local and cloud storage options. In local mode, data is stored entirely on the user's device, while cloud mode utilizes a secure database accessible through user accounts.

## 2. Requirements

### 2.1 Functional Requirements

- **Offline Functionality (Local Mode):** The application must function without an internet connection and account, allowing users to create, manage, and edit notes locally on their devices.
- Support for cloud mode
- **Cloud Storage and Synchronization:** The application shall provide cloud storage capabilities through user accounts. All notes, folders, and associated data will be synchronized between the server and user devices.
- **Note Management:** Users must be able to create, read, edit, pin important notes for easy access, archive less frequently used notes, and permanently delete unwanted notes.
- **Tagging:** Users must be able to assign relevant tags (keywords) to notes for improved categorization and enhanced searchability within the application.
- **Folder Organization:** The application should support the creation of folders for organizing notes. Users should be able to add notes to existing folders and assign custom colors and icons for better visual organization.
- **Trash Feature:** Pomei will implement a trash functionality where deleted notes are stored for a predetermined period (e.g., 30 days) before automatic deletion.
- **Search Functionality:** A robust search function allowing users to locate specific notes by title, content keywords, or assigned tags.
- **Sorting Options:** The application should offer customizable sorting options for notes, allowing users to organize them based on various criteria (e.g., date created, date modified, alphabetical order), or organize notes with drag-and-drop.
