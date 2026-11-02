# 📋 Task: TASK-001 - AI Lab System Initialization & Demo Validator

* **Status**: `DRAFT`
* **Created Date**: 2026-11-02
* **Leader**: Antigravity
* **Programmer**: ChatGPT / Codex
* **Double Checker**: OpenCode

---

## 🎯 Part 1: Leader Specification & Prompt (Antigravity)

### Objective
Create a core utility module for AI Lab that validates prompt formats, manages task metadata state, and calculates word/token complexity estimations for project prompts.

### Architectural Guidelines
* **Target Files**:
  * Implementation: `src/validator.py`
  * Tests: `tests/test_validator.py`
* **Language & Runtime**: Python 3.10+
* **Dependencies**: Standard library only (no external dependencies needed)

### Detailed Requirements
1. Define a data class `TaskMetadata` with fields: `task_id: str`, `title: str`, `status: str`, `created_date: str`.
2. Implement `validate_task_file(filepath: str) -> dict`:
   - Checks if the file contains the required sections (`Part 1`, `Part 2`, `Part 3`, `Part 4`).
   - Returns a status dictionary `{"valid": bool, "missing_sections": list[str], "word_count": int}`.
3. Implement `estimate_prompt_tokens(prompt_text: str) -> int`:
   - Simple heuristic token estimator (~4 characters per token).
4. Provide comprehensive unit tests in `tests/test_validator.py`.

### Acceptance Criteria
- [ ] `src/validator.py` implemented with full type hints and docstrings.
- [ ] `tests/test_validator.py` achieves >90% coverage for valid and invalid file scenarios.
- [ ] OpenCode review passes with no critical issues.

### 🤖 Prompt for Programmer (Copy & Send to ChatGPT / Codex)
```text
You are the Programmer for AI Lab. Follow the prompt instructions in prompts/PROGRAMMER_PROMPT.md.

Task: Implement src/validator.py and tests/test_validator.py in Python 3.

Requirements:
1. Data class TaskMetadata (task_id, title, status, created_date).
2. validate_task_file(filepath: str) -> dict:
   - Must check for sections: "Part 1: Leader Specification", "Part 2: Programmer Implementation", "Part 3: Double Checker Audit", "Part 4: Leader Sign-off".
   - Return {"valid": bool, "missing_sections": list[str], "word_count": int}.
   - Handle FileNotFoundError gracefully.
3. estimate_prompt_tokens(prompt_text: str) -> int:
   - Calculate estimated token count using standard 4 chars per token rule of thumb, minimum 0.
4. Unit tests in tests/test_validator.py covering:
   - Valid template parsing
   - Missing sections detection
   - Missing file handling
   - Token estimation calculations

Ensure code is clean, fully typed, and ready for double-checking by OpenCode.
```

---

## 💻 Part 2: Programmer Implementation (ChatGPT / Codex)

* **Completed Date**: [Pending Programmer submission]
* **Files Created / Modified**:
  * `src/validator.py`
  * `tests/test_validator.py`

### Implementation Summary
*Awaiting implementation from ChatGPT / Codex.*

---

## 🔍 Part 3: Double Checker Audit (OpenCode)

* **Review Date**: [Pending review]
* **Verdict**: `[ PENDING ]`

### Findings & Feedback
*Awaiting review by OpenCode.*

---

## 🏁 Part 4: Leader Sign-off (Antigravity)

* **Sign-off Date**: [Pending]
* **Final Status**: `DRAFT`
