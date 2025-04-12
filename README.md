# Fatebook MCP Server Project

## Overview

This project aims to implement an MCP (Model Context Protocol) server for [Fatebook](https://fatebook.io/), a platform for recording, sharing, and evaluating probabilistic predictions about future events. The server will strictly follow the MCP specification and integrate with the Fatebook API, enabling advanced automation, integrations, and agentic workflows.

## Current Status

- **Project rules and development guidelines** have been established, based on [MCP specification](https://modelcontextprotocol.io/llms-full.txt) and [Fatebook OpenAPI](https://fatebook.io/api/openapi.json).
- **Commit message conventions** (gitmoji + Conventional Commits) are documented.
- **Fatebook service research** and a comprehensive [reference document](docs/fatebook_reference.md) have been created.
- All activities are logged for traceability and reproducibility.

## Next Steps

- Design the MCP server architecture and select the technology stack (TypeScript/Python, etc.).
- Implement core MCP protocol features (transport, message types, error handling, etc.).
- Develop tools/resources for Fatebook API endpoints (getQuestions, addForecast, resolveQuestion, etc.).
- Ensure robust authentication, validation, and error mapping between MCP and Fatebook API.
- Write unit/integration tests and provide usage examples.
- Expand documentation and usage guides for developers and users.

## References

- [Fatebook Official Site](https://fatebook.io/)
- [Fatebook API Setup](https://fatebook.io/api-setup)
- [Fatebook Reference Document (Japanese)](docs/fatebook_reference.md)
- [MCP Specification](https://modelcontextprotocol.io/llms-full.txt)
- [Fatebook OpenAPI](https://fatebook.io/api/openapi.json)