# Test Fixes Task List

## Current Issues
1. Database pool management issues
2. Missing response structures
3. Failing category validation tests
4. Inconsistent error handling
5. Test data cleanup issues

## Tasks

### 1. Database Connection Management
- [ ] Move pool management to a separate singleton service
- [ ] Implement proper connection lifecycle for tests
- [ ] Add connection state tracking
- [ ] Handle cleanup in correct order

### 2. Category API Response Structure
- [ ] Ensure all responses follow format:
  ```js
  // Success response
  { success: true, data: <payload> }
  
  // Error response
  { success: false, error: <message> }
  ```

### 3. Category Validation Rules
- [ ] Implement name validation:
  - Minimum length: 2 characters
  - Maximum length: 100 characters
  - Required field
- [ ] Add unique name constraint handling
- [ ] Return proper 400 status codes for validation failures

### 4. Test Data Management
- [ ] Add test data seeding before relevant tests
- [ ] Clean test data between test runs
- [ ] Add test data constants file
- [ ] Ensure test isolation

### 5. Error Handling Standardization
- [ ] Create error types for different scenarios
- [ ] Standardize error messages
- [ ] Add error codes for different cases
- [ ] Implement consistent status codes:
  - 400: Validation errors
  - 404: Not found
  - 409: Conflicts (duplicates)
  - 500: Server errors

### 6. Test Fixes Required
- [ ] Fix "should return 400 if name is missing"
- [ ] Fix "should return all categories"
- [ ] Fix "should update an existing category"
- [ ] Fix "should delete a category"
- [ ] Fix "should prevent duplicate category names"

### 7. Code Quality Improvements
- [ ] Add input sanitization
- [ ] Improve error logging
- [ ] Add request validation middleware
- [ ] Add transaction support for complex operations

## Success Criteria
1. All tests passing
2. Consistent response format
3. Proper error handling
4. Clean database management
5. No pool connection issues
6. Proper test isolation
7. Meaningful error messages

## Implementation Notes
- Keep database connections minimal
- Use proper TypeScript types
- Follow REST best practices
- Maintain test independence
- Use proper async/await patterns
- Handle edge cases gracefully

## Testing Strategy
1. Run individual test suites
2. Test error scenarios explicitly
3. Verify response formats
4. Check database state after operations
5. Validate error messages
6. Ensure proper status codes 