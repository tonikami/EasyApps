import Foundation

public class EasyAppRequest {
    public static var requestDomain = ""
    
    public static func login(email: String, password: String, completion: @escaping (_ result: [String:Any]?) -> Void) {
        let urlString = URL(string: requestDomain + "/auth/login/\(email)/\(password)".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!)!
        makeRequest(urlString: urlString, completion: completion)
    }
    
    public static func register(email: String, password: String, name: String, completion: @escaping (_ result: [String:Any]?) -> Void) {
        let urlString = URL(string: requestDomain + "/auth/register/\(email)/\(password)/\(name)".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!)!
        makeRequest(urlString: urlString, completion: completion)
    }
    
    static func makeRequest(urlString: URL, completion: @escaping (_ result: [String:Any]?) -> Void) {
        let urlRequest = URLRequest(url: urlString)
        print("sending request")
        print(urlRequest.description)
        
        let task = URLSession.shared.dataTask(with: urlRequest) { (data, response, error) in
            if (error == nil && data != nil) {
                do {
                    let json = try JSONSerialization.jsonObject(with: data!, options: []) as? [String: Any]
                    print("Received valid response")
                    print(json ?? [])
                    return completion(json)
                } catch {
                }
            }
            completion(nil)
        }
        task.resume()
    }
}
