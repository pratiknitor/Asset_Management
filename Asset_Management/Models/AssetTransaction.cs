﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Asset_Management.Models
{
    public partial class AssetTransaction
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public string? EmpId { get; set; }
        [Required(ErrorMessage = "Email Required")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? Location { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? SubmitDate { get; set; }
        public int? AssetId { get; set; }
        public string? IssuedBy { get; set; }
        public string? Department { get; set; }
        public virtual AssetDetail? Asset { get; set; }
        public virtual User? User { get; set; }
    }

    public class SubmitDateValidationAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            DateTime dateTime = Convert.ToDateTime(value);
            int dt = DateTime.Compare(dateTime, DateTime.Now);
            if(dt > 0)
            {
                return false;
            }
            return true;
        }
    }
    
}
