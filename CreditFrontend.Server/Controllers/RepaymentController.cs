using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace CreditFrontend.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RepaymentController(HttpClient httpClient) : ControllerBase
    {
        private readonly HttpClient _httpClient = httpClient;

        [HttpGet("detail-repayment")]
        public async Task<IActionResult> GetDetailRepayment([FromQuery] string id)
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync($"https://localhost:7215/rest/v1/repayment/detail?loanId={id}");

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
