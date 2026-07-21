const mockUser = {
  id: 'csj-poc-user-001',
  name: 'CSJ POC Test User',
  email: 'poc.user@csj.example',
  role: 'POC Tester',
  department: 'Application Modernization',
  identityProvider: 'Mock Identity Provider',
  environment: 'Local Development'
}

export function signInMockUser() {
  localStorage.setItem('csj_poc_user', JSON.stringify(mockUser))
  return mockUser
}

export function signOutMockUser() {
  localStorage.removeItem('csj_poc_user')
}

export function getCurrentUser() {
  const user = localStorage.getItem('csj_poc_user')
  return user ? JSON.parse(user) : null
}