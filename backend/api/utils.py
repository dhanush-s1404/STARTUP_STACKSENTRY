def escape_like(value: str) -> str:
    """Escape LIKE wildcards (% and _) in user input for safe ilike queries."""
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
