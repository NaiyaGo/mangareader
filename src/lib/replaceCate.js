export function replaceCate(rawCateName) {
  
    return rawCateName.replace(/-/g, ' ').replace(/_/g, '&');;
}