using DAL.DTO.Req;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace CreditFrontend.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FundingController(HttpClient httpClient) : ControllerBase
    {
        private readonly HttpClient _httpClient = httpClient;

        [HttpGet("detail-funding")]
        public async Task<IActionResult> GetDetailFunding([FromQuery] string id)
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync($"https://localhost:7215/rest/v1/funding/detail?loanId={id}");

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

        [HttpGet("history-lender")]
        public async Task<IActionResult> GetHistoryLender()
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync("https://localhost:7215/rest/v1/funding/lender-history");

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
