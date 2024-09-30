using System.Net.Http.Headers;
using System.Net.Http;
using DAL.DTO.Req;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using DAL.DTO.Req.Auth;

namespace CreditFrontend.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(HttpClient httpClient) : ControllerBase
    {
        private readonly HttpClient _httpClient = httpClient;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ReqLoginDto request)
        {
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.PostAsync("https://localhost:7215/rest/v1/auth/login", content);

            var responseData = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                return Ok(responseData);
            }
            else
            {
                return BadRequest(responseData);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ReqRegisterAdminDto request)
        {
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.PostAsync("https://localhost:7215/rest/v1/auth/register-admin", content);

            var responseData = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                return Ok(responseData);
            }
            else
            {
                return BadRequest(responseData);
            }
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserData()
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync("https://localhost:7215/rest/v1/auth/user");

            var responseData = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                return Ok(responseData);
            }
            else
            {
                return BadRequest(responseData);
            }
        }
    }
}
