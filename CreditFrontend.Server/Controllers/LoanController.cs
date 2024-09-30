using DAL.DTO.Req.Auth;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using DAL.DTO.Req.Loan;

namespace CreditFrontend.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoanController(HttpClient httpClient) : ControllerBase
    {
        private readonly HttpClient _httpClient = httpClient;

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteLoan([FromQuery] string id)
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.DeleteAsync($"https://localhost:7215/rest/v1/loan?id={id}");

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

        [HttpPost("create")]
        public async Task<IActionResult> CreateLoan([FromBody] ReqCreateLoan request)
        {
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.PostAsync("https://localhost:7215/rest/v1/loan", content);

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

        [HttpPut("paythebill")]
        public async Task<IActionResult> PayLoanInMonth([FromBody] ReqPayLoan request, [FromQuery] string id)
        {
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.PutAsync($"https://localhost:7215/rest/v1/loan/pay?loanId={id}", content);

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

        [HttpGet("history-borrower")]
        public async Task<IActionResult> GetHistoryBorrower([FromQuery] string type)
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync($"https://localhost:7215/rest/v1/loan/borrower-history?type={type}");

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

        [HttpGet("acc-mhanx")]
        public async Task<IActionResult> AcceptLoan([FromQuery] string id)
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync($"https://localhost:7215/rest/v1/loan/accept?loanId={id}");

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

        [HttpGet("rikwes-peminjam")]
        public async Task<IActionResult> GetListLoans()
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync("https://localhost:7215/rest/v1/loan/requested");

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
